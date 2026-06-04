import { type ShallowRef, shallowRef } from 'vue';
import { isNullish } from '../utils';

export interface UseFetchOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (err: any) => void;
  onFinally?: () => void;
  immediate?: boolean;
  initialData?: T;
  stale?: any;
}

interface UseFetchStale<T> {
  isFetching: ShallowRef<boolean>;
  data: ShallowRef<T | undefined>;
  error: ShallowRef<any>;
  promise: ShallowRef<Promise<T>>;
}

interface UseFetchResult<T, U> extends UseFetchStale<T> {
  execute: (params?: U | undefined) => Promise<void>;
}

const staleMap = new Map<any, UseFetchStale<any>>();

export function useFetch<T = any, U = any>(
  fetcher: (params: U) => Promise<T> | T,
  options: UseFetchOptions<T> = {},
): UseFetchResult<T, U> {
  const { immediate = true, initialData, stale, onSuccess, onError, onFinally } = options;

  const { promise: firstPromise, resolve, reject } = Promise.withResolvers<T>();

  const { isFetching, error, data, promise } = (!isNullish(stale) && staleMap.get(stale)) || {
    isFetching: shallowRef(false),
    data: shallowRef<T | undefined>(initialData),
    error: shallowRef<any>(),
    promise: shallowRef<Promise<T>>(firstPromise),
  };

  if (!isNullish(stale) && !staleMap.get(stale)) {
    staleMap.set(stale, {
      isFetching,
      error,
      data,
      promise,
    });
  }

  const promisedFetcher = async (params: U) => {
    return await fetcher(params); // 自动处理 Promise 和普通值
  };

  async function execute(params?: U) {
    if (isFetching.value) {
      return;
    }

    try {
      error.value = undefined;
      isFetching.value = true;

      promise.value = promisedFetcher(params as U);

      const res = await promise.value;
      data.value = res;
      onSuccess?.(res);
      resolve(res);
    } catch (err) {
      error.value = err;
      onError?.(err);
    } finally {
      isFetching.value = false;
      onFinally?.();
      reject();
    }
  }

  if (immediate) {
    if (isNullish(stale) || isNullish(data.value)) {
      Promise.resolve().then(() => {
        execute();
      });
    }
  }

  return {
    isFetching,
    error,
    data,
    execute,
    promise,
  };
}
