import { IRequestConfig, IResponse } from "./../types/request.d";
import { isURL } from "./index";
import { logger } from "./logger";
import {
  getCurrentInstance,
  showToast,
  getCache,
  saveCache,
  deleteCache,
  env,
} from "./uni-app";
import {
  OFFLINE,
  WHITE_MENU,
  TIME_OUT,
  LOGIN_PATH,
  USER_INFO,
  API_ENV,
} from "@/constants/app";
import { BASE_API } from "./proxy";
import { BaseObject } from "@/types/uni.d";



/**
 * 处理请求地址，主要处理以下三种情况
 * 1. 特殊场景需要使用完整请求路径，如：https://开头的请求地址
 * 2. 使用mock，在api目录封装的方法中设置isMock为true，且提供mockUrl时
 * 3. 接口调用需要区分不同环境时，目前由 utils/uni-app 方法中 env 字段决定，
 *    有 develop、trial、release 三种枚举
 * @param0 {Boolean} isMock  是否需要mock
 * @param1 {String}  url     请求地址
 * @param2 {String}  mockUrl  mock地址
 * @returns
 */
function handleRequestURL({
  isMock = process.env.MOCK,
  url = "",
  mockUrl = "",
}): string {
  if (isURL(url)) {
    return url;
  }

  if (isMock && mockUrl) {
    return mockUrl;
  }

  return (BASE_API[`${env}`] || BASE_API.release) + url;
}

/**
 * 处理请求头header
 * 1. 当needToken为true时，Authorization拼接token
 * 2. 区分蓝绿环境
 * @param {Boolean} needToken 是否需要token
 * @returns
 */
function handleHeader(needToken = true) {
  const { token } = getCache(USER_INFO);
  const headers: BaseObject<string> = {};

  if (token && needToken) {
    headers.Authorization = `Bearer ${token}`;
  }

  headers["n-d-env"] = API_ENV;

  return headers;
}

/**
 * 通用网络请求封装
 *
 * @param {object} config 请求配置对象
 * @returns
 */
export async function request(config: IRequestConfig): Promise<IResponse> {
  const {
    url, // 接口地址
    data, // 请求参数
    method = "GET", // 请求方法
    showErrMsg = true, // 请求出错的时候，是否展示接口错误信息
    needToken = true, // 是否校验请求 header 的 token 信息
    delay = 0, // 当页面存在 loading 效果，是否需要 response 延迟展示
  } = config;

  


  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {

    // 请求开始时间
    const requestBeginTime = Date.now();

    uni.request({
      data,
      url: handleRequestURL(config),
      header: handleHeader(needToken),
      timeout: TIME_OUT,
      method,
      success: (res: UniApp.RequestSuccessCallbackResult) => {
        // 请求结束时间
        const requestEndTime = Date.now();
        // 时间差
        const delta = requestEndTime - requestBeginTime;

        logger(config, {
          ...res,
          delta,
        });

        const result = handleHttpCode(res, config, resolve as any);

        if (!result) {
          return false;
        }

        const timeOut = setTimeout(
          () => {
            clearTimeout(timeOut);
            handleResponse(showErrMsg, res.data as IResponse, url as string);
            resolve(res.data as IResponse);
          },
          delay && delta < delay ? delay - delta : 0
        );
      },
      fail: (err: UniApp.GeneralCallbackResult) => {
        handleError(err, showErrMsg);
        resolve({} as any);
      },
    });
  });
}

export const axios = request;
export const fetch = request;

function handleHttpCode(
  { statusCode, data }: UniNamespace.RequestSuccessCallbackResult,
  { showErrMsg }: IRequestConfig,
  resolve: {
    (value: unknown): void;
    (arg0: string | AnyObject | ArrayBuffer): void;
  }
) {
  if (statusCode !== 200) {
    if (statusCode === 401 || statusCode === 801) {
      deleteCache("loginInfo");
      deleteCache("PATIENT_INFO");

      uni.redirectTo({
        url: `/${LOGIN_PATH}`,
      });
    } else {
      showErrMsg && showToast("网络似乎走丢了...");
    }

    resolve(data);

    return false;
  }

  return true;
}

function handleResponse(showErrMsg = true, response: IResponse, url: string) {
  const { res, msg = "请求出错" } = response;
  const route = getCurrentInstance();

  // 当 token 过期，或未登录，且不在白名单中
  if (
    res === 801 &&
    route !== LOGIN_PATH &&
    WHITE_MENU.findIndex((item) => url === item.url) < 0
  ) {
    // 页面跳转至登录页面后，会根据 storage 中存下的 lastPage 返回原先页面
    saveCache("lastPage", `/${route}`);

    uni.redirectTo({
      url: `/${LOGIN_PATH}`,
    });
  }

  if (showErrMsg && res !== 0) {
    // 在小程序中，系统的 toast，和 loading 使用的是同一个图层，需要额外处理
    setTimeout(() => {
      showToast(msg);

      setTimeout(() => {
        uni.hideToast();
      }, 2000);
    }, 0);
  }
}

function handleError(err: UniApp.GeneralCallbackResult, showErrMsg = true) {
  if (showErrMsg) {
    showToast(
      err.errMsg === "request:fail timeout"
        ? "网络似乎走丢了..."
        : err.errMsg || "请求失败"
    );
  }
}
