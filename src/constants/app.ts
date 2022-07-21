import { ApiEnv } from "@/types/request";

/**
 * 请求超时上限
 */
export const TIME_OUT = 5000

/**
 * 当网络断开时的response
 */
export const OFFLINE = {
  code: 3000,
  data: {},
  msg: '网络似乎走丢了...',
};

/**
 * 白名单，
 * 可用于设置不需要登录的页面，
 * 主要是以请求头header里是否携带token控制
 */
export const WHITE_MENU: {url: string}[] = []

/**
 * 登录页路径
 */
export const LOGIN_PATH = ''


/**
 * USER_INFO 表示storage中对用户信息的缓存字段
 * 该字段可根据实际情况修改
 */
export const USER_INFO = 'USER_INFO'


/**
 * 用于后端蓝绿环境区分
 */
export const API_ENV: ApiEnv = 'common'