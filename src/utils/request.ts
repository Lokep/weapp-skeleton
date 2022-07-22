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
  isMock = process.env.MOCK as unknown as boolean,
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
export async function request(
  config: IRequestConfig
): Promise<UniApp.RequestSuccessCallbackResult> {
  const {
    data, // 请求参数
    method = "GET", // 请求方法
    needToken = true, // 是否校验请求 header 的 token 信息
  } = config;

  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    uni.request({
      data,
      url: handleRequestURL(config),
      header: handleHeader(needToken),
      timeout: TIME_OUT,
      method,
      success: (res: UniApp.RequestSuccessCallbackResult) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}

export const axios = request;
export const fetch = request;
