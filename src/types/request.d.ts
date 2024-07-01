


export interface IRequestConfig extends UniApp.RequestOptions {
  baseUrl: string;

  showLoading: boolean;
  showSuccess: boolean;
  showErrMsg: boolean;
  loadingText: string;
  successText: string;
  errText: string;

  auth: boolean;
  delay: number;
  timeout: number;
  mock: boolean;
  mockUrl: string;

}



export type Middleware = (
  config: Partial<IRequestConfig>, 
  next: () => Promise<any>
) => Promise<any>;
