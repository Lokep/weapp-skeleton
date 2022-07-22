export interface IRequestConfig {
  /**
   * 资源url
   */
  url?: string;
  /**
   * 请求的参数
   */
  data?: string | AnyObject | ArrayBuffer;
  /**
   * 默认为 GET
   * 可以是：OPTIONS，GET，HEAD，POST，PUT，DELETE，TRACE，CONNECT
   */
  method?:
    | "OPTIONS"
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "TRACE"
    | "CONNECT";
  /**
   * 超时时间
   */
  timeout?: number;

  /**
   * 是否展示 系统默认的loading
   */
  showLoading?: boolean;

  /**
   * 请求出错的时候，是否展示接口错误信息
   */
  showErrMsg?: boolean;

  /**
   * 是否校验请求 header 的 token 信息
   */
  needToken?: boolean;

  /**
   * 当页面存在 loading 效果，是否需要 response 延迟展示
   */
  delay?: number;

  isMock?: boolean;

  mockUrl?: string;
}

export interface IResponse {
  res: number;
  data?: AnyObject;
  msg?: string;
  [key: string]: any;
}

export type ApiEnv = "common" | "blue";

export type Next = (...args: any) => Promise<boolean | IResponse>

export type BaseContext = (
  config?: IRequestConfig,
  next?: Next
) => boolean;

export type BasePromiseContext = (
  config?: IRequestConfig,
  next?: Next
) => Promise<boolean>;

export type AfterHook = (response: IResponse, config?: IRequestConfig) => IResponse