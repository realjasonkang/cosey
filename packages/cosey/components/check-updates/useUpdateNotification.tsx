import { ElButton, ElNotification, type NotificationHandle } from 'element-plus';
import { onUnmounted, getCurrentInstance } from 'vue';
import { createBem } from '../../utils';
import { useLocale } from '../../hooks';

export function useUpdateNotification() {
  const { t } = useLocale();
  const bem = createBem('check-updates');

  const { appContext } = getCurrentInstance()!;

  let notificationHandle: NotificationHandle | null = null;

  const hideNotice = () => {
    if (notificationHandle) {
      notificationHandle.close();
      notificationHandle = null;
    }
  };

  const showNotice = () => {
    if (notificationHandle) {
      return;
    }

    notificationHandle = ElNotification(
      {
        onClose: () => {
          notificationHandle = null;
        },
        customClass: bem.b(),
        message: () => (
          <div>
            <div class={bem.e('title')}>{t('co.checkUpdates.newVersionAvailable')}</div>
            <div>{t('co.checkUpdates.updateNow')}</div>
            <div class={bem.e('actions')}>
              <ElButton
                type="primary"
                onClick={() => {
                  window.location.reload();
                }}
              >
                {t('co.checkUpdates.refreshNow')}
              </ElButton>
              <ElButton
                onClick={() => {
                  hideNotice();
                }}
              >
                {t('co.checkUpdates.refreshLater')}
              </ElButton>
            </div>
          </div>
        ),
        type: 'primary',
        duration: 0,
      },
      appContext,
    );
  };

  onUnmounted(() => {
    hideNotice();
  });

  return {
    showNotice,
    hideNotice,
  };
}
