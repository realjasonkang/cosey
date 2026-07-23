import { defineComponent, provide, SlotsType, watch } from 'vue';
import {
  configProviderProps,
  useConfig,
  useConfigProvide,
  type ConfigProviderInnerProps,
} from './config-provider.api';
import { localeContextKey, outsideLocale, useColorSchemeProvide } from '../../hooks';
import en from '../../locale/lang/en';
import { type Language, useCoseyLocale } from '../../locale';
import { useLayoutStore } from '../../store';
import { useContainerProvide } from '../container';
import { useStackDialogProvide } from '../stack-dialog';
import { useGlobalConfig } from '../../config';
import { provideUploadConfig } from '../../config/upload';
import { useTheme } from '../../theme';

export default defineComponent({
  name: 'CoConfigProvider',
  props: configProviderProps,
  slots: Object as SlotsType<{
    default: { locale: Language };
  }>,
  setup(props, { slots }) {
    const parentContext = useConfig();

    if (parentContext) {
      throw new Error('ConfigProvider can only be used once at the root.');
    }

    // ================================== theme ===================================
    useTheme(() => props.theme);

    // =============================== color scheme ===============================
    useColorSchemeProvide();

    // ================================= locale ===================================
    const coseyLocale = useCoseyLocale();

    provide(localeContextKey, coseyLocale);

    watch(
      coseyLocale,
      (locale) => {
        outsideLocale.value = locale || en;
      },
      {
        immediate: true,
      },
    );

    // ============================= config provider ==============================
    const configProvider: ConfigProviderInnerProps = {
      table: () => props.table,
      tableAction: () => props.tableAction,
    };

    useConfigProvide(configProvider);

    // ================================= upload ===================================
    const apiConfig = useGlobalConfig()?.api;

    if (apiConfig) {
      const uploadApi = apiConfig.upload;
      provideUploadConfig({
        request: uploadApi,
      });
    }

    // ================================ container =================================
    const layoutStore = useLayoutStore();
    useContainerProvide(() => layoutStore.headerHeight);

    // =============================== stack dialog ===============================
    useStackDialogProvide();

    // =============================== template ===============================
    return () => {
      return slots.default?.({
        locale: coseyLocale.value,
      });
    };
  },
});
