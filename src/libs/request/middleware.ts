import type { IRequestConfig } from "@/types/request";
import { sleep } from "@/utils";
import { prettyLog } from "@/utils/prettyLog";
import { getCache, showToast } from "@/utils/uniapp";

export const ToastMiddleware = async (
  config: Partial<IRequestConfig>,
  next: Function
) => {
  console.log("[config]: ", config);
  console.log("[ToastMiddleware Start]");

  if (config.showLoading) {
    showToast(config.loadingText || "加载中...", "loading");
  }

  try {
    const res = await next();

    if (config.showSuccess) {
      showToast(config.successText || "请求成功");
    }

    if (config.showErrMsg) {
      showToast(config.errText || res.data.message || "请求失败");
    }
    return res;
  } catch (error) {
    if (config.showErrMsg) {
      showToast(config.errText || "请求失败");
    }
    return Promise.reject(error);
  }
};

export const DelayLoadingMiddleware = async (
  config: Partial<IRequestConfig>,
  next: Function
) => {
  if (config.delay) {
    await sleep(config.delay);
  }

  const res = await next();

  res.delayLoading = true;

  return res;
};

export const ErrorHandlerMiddleware = async (
  config: Partial<IRequestConfig>,
  next: Function
) => {
  console.log("[config]: ", config);
  console.log("[ErrorHandlerMiddleware Start]");
  const res = await next();
  console.log("[ErrorHandlerMiddleware End]", res);
  res.errorhandler = true;
  return res;
};

export const LogMiddleware = async (
  config: Partial<IRequestConfig>,
  next: Function
) => {
  try {
    prettyLog(config.method!, config.url!);
    const res = await next();
    res.log = true;
    return res;
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @param config
 * @param next
 * @returns
 */
export const AuthMiddleware = async (
  config: Partial<IRequestConfig>,
  next: Function
) => {
  const res = await next();
  console.log("[AuthMiddleware End]", res);
  res.auth = true;
  return res;
};

export const AuthCheckMiddleware = () => {
  // console.log('[config]: ',config)
  // console.log('[AuthCheckMiddleware Start]')
  // const res = await next()
  // console.log('[AuthCheckMiddleware End]', res)
  // res.authcheck = true
  // return res

  const state = {
    queue: [] as Function[],
    login: () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({ token: "token" });
        }, 1000);
      }),
  };

  return async function (config: Partial<IRequestConfig>, next: Function) {
    const { token } = getCache("__AUTH__");
    console.log("[AuthCheckMiddleware Start]");

    if (!token) {
      state.queue.push(next);

      await state.login();
      state.queue = [];
    }

    const res = await next();
    console.log("[AuthCheckMiddleware End]", res);
    return res;
  };
};

export const ResponseMiddleware = async (
  config: Partial<IRequestConfig>,
  next: Function
) => {
  console.log("[config]: ", config);
  console.log("[ResponseMiddleware Start]");
  const res = await next();
  console.log("[ResponseMiddleware End]", res);
  res.response = true;
  return res;
};
