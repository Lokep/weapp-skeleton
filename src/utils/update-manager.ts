import { showToast } from "./uni-app";

if (uni.canIUse('getUpdateManager')) {
  const updateManager = uni.getUpdateManager();

  updateManager.onCheckForUpdate((res) => {
    if (res.hasUpdate) {
      updateManager.onUpdateReady(() => {
        updateManager.applyUpdate();
      });

      updateManager.onUpdateFailed(() => {
        showToast('新版本更新失败，请手动重启小程序');
      });
    }
  });
}
