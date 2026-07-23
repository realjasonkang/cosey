import { defineComponent } from 'vue';
import { useUpdateNotification } from './useUpdateNotification';
import { getVersionTag } from './utils';
import { useCheckUpdateInterval } from './useCheckUpdateInterval';

export default defineComponent({
  name: 'CoCheckUpdates',
  setup() {
    let lastVersionTag = '';

    const checkForUpdates = async () => {
      const versionTag = await getVersionTag();
      if (!versionTag) {
        return false;
      }

      if (!lastVersionTag) {
        lastVersionTag = versionTag;
        return false;
      }

      if (lastVersionTag === versionTag) {
        return false;
      }

      lastVersionTag = versionTag;
      return true;
    };

    const { showNotice } = useUpdateNotification();

    useCheckUpdateInterval(() => {
      checkForUpdates().then((updated) => {
        if (updated) {
          showNotice();
        }
      });
    });

    return () => {};
  },
});
