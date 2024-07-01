import type { IRequestConfig, Middleware } from "@/types/request.d";
import { ToastMiddleware,DelayLoadingMiddleware, ErrorHandlerMiddleware, AuthMiddleware, LogMiddleware, AuthCheckMiddleware, ResponseMiddleware } from "./middleware";

const DefaultMiddlewares = [
  ToastMiddleware,
  DelayLoadingMiddleware,
  ErrorHandlerMiddleware,
  AuthMiddleware,
  LogMiddleware,
  AuthCheckMiddleware(),
  ResponseMiddleware,
]

export default function customRequest(config: Partial<IRequestConfig>, middlewares: Middleware[] = DefaultMiddlewares) {
  let i = 0;
  const middleware: Middleware[] = []

  const requestConfig: Partial<IRequestConfig> = {
    method: 'GET',
    ...config,
  }

  function addTask() {
    middleware.push(...arguments)
  }

  async function runTask(): Promise<any> {
    const task = middleware.shift()

    if (task) {

      const oldIndex = i
      const res = await task(requestConfig, next) // run the next middleware

      if (oldIndex === i) {
        next()
      }

      return res
    }

    i = 0
    return
  }

  async function next(): Promise<any> {
    i++

    const res = await runTask()

    return res
  }




  if (Array.isArray(middlewares) && middlewares.length) {
    // @ts-ignore
    addTask(...middlewares)
  }

  // @ts-ignore
  addTask(() => requestify(requestConfig))

  return runTask()
}




export const requestify = (options: UniApp.RequestOptions) =>
  new Promise((resolve, reject) => resolve(options)
    // uni.request({
    //   ...options,
    //   success: resolve,
    //   fail: reject,
    // })
  );




