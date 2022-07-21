import { ENUM_PLATFORM, ToastIcon, ISystemInfo } from "@/types/uni.d";
import { isArray } from "./index";

// 缓存
export const saveCache = <T>(k: string, v: T) => uni.setStorageSync(k, v);
export const getCache = (k: string) => uni.getStorageSync(k);
export const deleteCache = (k: string) => uni.removeStorageSync(k);

// 使用条件编译获取平台信息
export function getPlatform() {
  let platform = null;
  // #ifdef APP-PLUS
  platform = ENUM_PLATFORM.AppPlus;
  // #endif
  // #ifdef APP-PLUS-NVUE
  platform = ENUM_PLATFORM.AppPlusNvue;
  // #endif
  // #ifdef H5
  platform = ENUM_PLATFORM.H5;
  // #endif
  // #ifdef MP-WEIXIN
  platform = ENUM_PLATFORM.MpWeixin;
  // #endif
  // #ifdef MP-ALIPAY
  platform = ENUM_PLATFORM.MpAlipay;
  // #endif
  // #ifdef MP-BAIDU
  platform = ENUM_PLATFORM.MpBaidu;
  // #endif
  // #ifdef MP-TOUTIAO
  platform = ENUM_PLATFORM.MpToutiao;
  // #endif
  // #ifdef MP-QQ
  platform = ENUM_PLATFORM.MpQq;
  // #endif
  // #ifdef MP-360
  platform = ENUM_PLATFORM.Mp360;
  // #endif
  // #ifdef quickapp-webview
  platform = ENUM_PLATFORM.QuickappWebview;
  // #endif
  // #ifdef quickapp-webview-union
  platform = ENUM_PLATFORM.QuickappWebviewUnion;
  // #endif
  // #ifdef quickapp-webview-huawei
  platform = ENUM_PLATFORM.QuickappWebviewHuawei;
  // #endif
  return platform;
}

// 获取当前帐号信息
export const accountInfo: {
  envVersion: string;
  appId: string;
  version: string;
} = (() => {
  if (
    getPlatform() === "MP-WEIXIN" ||
    getPlatform() === "MP-BAIDU" ||
    getPlatform() === "MP-QQ"
  ) {
    const { envVersion, appId, version } = uni.getAccountInfoSync().miniProgram;
    return { envVersion, appId, version };
  } else {
    return {
      envVersion: process.env.NODE_ENV || "release",
      appId: "",
      version: "",
    };
  }
})();

/**
 * 获取小程序环境变量
 * 1. develop
 * 2. trial
 * 3. release
 */
export const { envVersion: env, appId, version } = accountInfo;

/**
 * @description 获取网络类型
 * @returns {string} networkType: wifi, 2g, 3g, 4g, 5g, ethernet，unknown, none
 */
export const getNetworkType = (): Promise<string> => {
  return new Promise((resolve) => {
    uni.getNetworkType({
      success: (result) => {
        resolve(result.networkType);
      },
      fail: () => {
        resolve("unknown");
      },
    });
  });
};

/**
 * @description 获取系统信息
 * @returns {Promise<ISystemInfo>} Promise<ISystemInfo>
 */
export const getSystemInfo = (): Promise<ISystemInfo> =>
  new Promise((resolve) => {
    uni.getSystemInfo({
      success: (res) => {
        resolve({
          ...res,
          code: "SUCCESS",
          msg: "success",
        });
      },
      fail: (err) => {
        resolve({
          ...err,
          code: "FAIL",
          msg: "系统信息获取失败",
        });
      },
    });
  });

/**
 * 消息提示框封装
 * @param title 提示的内容
 * @param icon 图标，可选 success | error | loading | none
 * @param duration 提示的延迟时间
 */
export const showToast = (
  title: string,
  icon: ToastIcon = "none",
  duration = 2000
) => {
  uni.showToast({
    title,
    icon,
    duration,
  });
};

export const showLoading = (title: string = '加载中', mask: boolean = false) => {
  uni.showLoading({
    title,
    mask,
  });
};

// 获取当前页面栈的实例
export const getCurrentInstance = () => {
  const routes: Page.PageInstance<AnyObject, {}>[] = getCurrentPages();

  if (isArray(routes) && routes.length > 0) {
    const { route } = routes[routes.length - 1];

    return route;
  }

  return false;
};

// 登录 h5环境不可使用
export const uniLogin = () => {
  if (getPlatform() === ENUM_PLATFORM.H5) {
    return false;
  }

  return new Promise((resolve) => {
    uni.login({
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        resolve(err);
      },
    });
  });
};

// 获取元素尺寸
export function getRect(context: Uni, selector: string) {
  return new Promise((resolve) => {
    uni
      .createSelectorQuery()
      .in(context)
      .select(selector)
      .boundingClientRect((res) => resolve(res))
      .exec((rect = []) => resolve(rect[0]));
  });
}

export const go = (url: string) => uni.navigateTo({ url });

export const redirectTo = (url: string) => uni.redirectTo({ url });

export const downloadFile = (
  url: string,
  showLoading = true,
  loadingText: string = ""
) =>
  new Promise((resolve) => {
    if (showLoading) {
      uni.showLoading({
        title: loadingText || "文档加载中",
      });
    }

    uni.downloadFile({
      url,
      success: (res) => {
        if (res.statusCode === 200) {
          console.log("下载成功", res);
          resolve(res.tempFilePath);
        }
        resolve(false);
      },
      fail: () => {
        showToast("文档加载失败");
        resolve(false);
      },
      complete: () => {
        if (showLoading) {
          uni.hideLoading();
        }
      },
    });
  });

export const openDocument = (
  tempFilePath: string,
  showLoading = true,
  loadingText: string = ""
) => {
  if (showLoading) {
    uni.showLoading({
      title: loadingText || "文档加载中",
    });
  }

  uni.openDocument({
    filePath: tempFilePath,
    success: () => {
      console.log("打开文档成功");
    },
    fail: (err) => {
      console.log("[打开文档失败]: ", err);
      showToast("文档打开失败");
    },
    complete: () => {
      if (showLoading) {
        uni.hideLoading();
      }
    },
  });
};

const fileSystemManager = uni.getFileSystemManager();

export const moveFile = (oldPath: string, newPath: string) =>
  new Promise((resolve) => {
    fileSystemManager.rename({
      oldPath,
      newPath,
      success: () => {
        resolve(true);
      },
      fail: () => {
        resolve(false);
      },
    });
  });

export const renameFile = moveFile;

/**
 * 打开h5，并且跳转到指定的页面，展示指定的标题
 * @param {String} url
 * @param {String} title
 */
export const openWebview = (url: string, title: string) => {
  uni.navigateTo({
    url: "/pages/common/webview/index",
    success: (e) => {
      e.eventChannel.emit("transportWebView", {
        url,
        title,
      });
    },
  });
};

export const showModal = ({
  title = "提示",
  content = "",
  cancelText = "取消",
  confirmText = "确定",
  cancelColor = "#000",
  confirmColor = "#576B95",
  showCancel = true,
}) =>
  new Promise((resolve) => {
    uni.showModal({
      title,
      content,
      cancelText,
      confirmText,
      cancelColor,
      confirmColor,
      showCancel,
      success: (res) => {
        resolve(res.confirm);
      },
    });
  });

/**
 * @returns {Number} 导航栏+状态栏高度，单位px
 */
export async function getNavbarHeight() {
  const { statusBarHeight } = await getSystemInfo();
  const { height: menuButtonHeight, top: menuButtonTop } =
    uni.getMenuButtonBoundingClientRect();
  const navBarHeight =
    (menuButtonTop - Number(statusBarHeight)) * 2 + menuButtonHeight;

  return navBarHeight + Number(statusBarHeight);
}
