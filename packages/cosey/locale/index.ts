import { type App, inject, InjectionKey, Ref, shallowRef, toValue, watch } from 'vue';
import { createI18n, type I18n } from 'vue-i18n';
import { defaultsDeep } from 'lodash-es';
import dayjs from 'dayjs';
import { defaultI18nConfig, RequiredI18nConfig, type I18nConfig } from '../config/i18n';
import { persist } from '../persist';
import { ref } from 'vue';

export type TranslatePair = {
  [key: string]: string | string[] | TranslatePair;
};

export type Language = {
  name: string;
  el: TranslatePair;
  co: TranslatePair;
};

const langKey = 'Cosey:lang';

const rtlLangs = ['ar'];

function getMessages(config: RequiredI18nConfig, type: 'dayjs' | 'cosey' | 'app') {
  const langs: Record<string, any> = {};
  config.messages.forEach((item) => {
    langs[item.value] = item[type];
  });
  return langs;
}

const coseyLocaleKey = Symbol('coseyLocale') as InjectionKey<Ref<Language>>;
const localeMessagesKey = Symbol('localeMessages') as InjectionKey<RequiredI18nConfig['messages']>;

export let i18n: I18n<Record<string, any>, {}, {}, any, false>;

export function launchLocale(app: App, config: I18nConfig = {}) {
  const mergedConfig: RequiredI18nConfig = defaultsDeep(config, defaultI18nConfig);

  const appMessages = getMessages(mergedConfig, 'app');
  const coesyMessages = getMessages(mergedConfig, 'cosey');
  const dayjsMessages = getMessages(mergedConfig, 'dayjs');

  const locale = persist.get(langKey) || mergedConfig.locale;
  const coseyLocale = shallowRef<Language>({} as Language);

  i18n = createI18n({
    legacy: false,
    locale: locale,
    fallbackLocale: locale,
    messages: appMessages,
    silentTranslationWarn: true,
    silentFallbackWarn: true,
    missingWarn: false,
    fallbackWarn: false,
  });

  watch(
    () => toValue(i18n.global.locale),
    (locale) => {
      coseyLocale.value = coesyMessages[locale];
      dayjs.locale(dayjsMessages[locale]);
      persist.set(langKey, locale);

      document.documentElement.setAttribute('dir', rtlLangs.includes(locale) ? 'rtl' : 'ltr');
    },
    {
      immediate: true,
    },
  );

  app.use(i18n);

  app.provide(coseyLocaleKey, coseyLocale);

  app.provide(localeMessagesKey, mergedConfig.messages);
}

export function useCoseyLocale() {
  return inject(coseyLocaleKey, ref({} as Language));
}

export function useLocaleMessages() {
  return inject(localeMessagesKey, []);
}
