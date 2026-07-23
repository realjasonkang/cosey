import { onMounted, onUnmounted } from 'vue';

export function useCheckUpdateInterval(callback: () => void) {
  let timer: ReturnType<typeof setInterval> | null = null;

  const start = () => {
    stop();

    timer = setInterval(() => {
      callback();
    }, 60 * 1000);
  };

  const stop = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  function handleVisibilitychange() {
    if (document.hidden) {
      stop();
    } else {
      callback();
      start();
    }
  }

  onMounted(() => {
    start();
    document.addEventListener('visibilitychange', handleVisibilitychange);
  });

  onUnmounted(() => {
    stop();
    document.removeEventListener('visibilitychange', handleVisibilitychange);
  });

  Promise.resolve().then(() => {
    callback();
  });
}
