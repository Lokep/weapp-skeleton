import { IResponse } from "./../types/request.d";
import { IRequestConfig } from "@/types/request";
import { isArray, isNumber, isObject, isString } from "./index";
import { env } from "./uni-app";

enum COLOR {
  PRIMARY = "#409EFF",
  SUCCESS = "#67C23A",
  WARN = "#E6A23C",
  DANGER = "#F56C6C",
}

interface LoggerContent extends UniApp.RequestSuccessCallbackResult {
  delta: number;
}

export const logger = (req: IRequestConfig, res: LoggerContent) => {

  if (env === "release") {
    return;
  }

  const { url, method = "GET", isMock = false } = req;

  if (isMock) {
    return;
  }

  handleCallback(
    { method, url },
    { data: res.data as IResponse, delta: res.delta }
  );
};

function handleStyle(status: string) {
  let bg = "";

  switch (status) {
    case COLOR.DANGER:
      bg = `background: ${COLOR.DANGER};`;
      break;
    case COLOR.PRIMARY:
      bg = `background: ${COLOR.PRIMARY};`;
      break;
    case COLOR.SUCCESS:
      bg = `background: ${COLOR.SUCCESS};`;
      break;
    case COLOR.WARN:
      bg = `background: ${COLOR.WARN};`;
      break;
    default:
      bg = `background: ${COLOR.PRIMARY};`;
      break;
  }

  return (
    bg +
    `border-radius: 2px;
    padding: 3px 2px; text-align: center;
    color: #fff;
    font-weight: 400;
    width: 30pt;`
  );
}

function handleOutputUrl(url: string) {
  const MAX_LENGTH = 15;
  const urlArray = url.split("?")[0].split("/");
  return urlArray
    .slice(urlArray[urlArray.length - 1].length > MAX_LENGTH ? -1 : -2)
    .join("/");
}

function handleCallback(
  { method = "GET", url = "" }: IRequestConfig,
  { data: res, delta }: { data: IResponse; delta: number }
) {
  if (res.hasOwnProperty("res") && res?.res !== 0) {
    console.log(
      `%c ${method.toUpperCase()} %c ${handleOutputUrl(
        url
      )}  %c ${delta}ms %c ${res?.msg} `,
      handleStyle(COLOR.WARN),
      `color: ${COLOR.WARN}`,
      `color: ${COLOR.WARN}`,
      `color: ${COLOR.DANGER}`
    );

    return;
  }

  if (res.data && isArray(res.data) && res.data.length > 0) {
    if (isNumber(res.data[0]) || isString(res.data[0])) {
      console.groupCollapsed(
        `%c ${method.toUpperCase()} %c ${handleOutputUrl(url)}  %c ${delta}ms `,
        handleStyle(COLOR.SUCCESS),
        `color: ${COLOR.SUCCESS};font-weight: 400;`,
        `color: ${COLOR.WARN};font-weight: 400;`
      );
      console.table(res.data);
      console.groupEnd();
    } else if (isObject(res.data[0])) {
      console.groupCollapsed(
        `%c ${method.toUpperCase()} %c ${handleOutputUrl(url)}  %c ${delta}ms `,
        handleStyle(COLOR.SUCCESS),
        `color: ${COLOR.SUCCESS};font-weight: 400;`,
        `color: ${COLOR.WARN};font-weight: 400;`
      );

      const tableHeader = Object.keys(res.data[0]);
      console.table(res.data, tableHeader);
      console.groupEnd();
    }
  } else {
    console.log(
      `%c ${method.toUpperCase()} %c ${handleOutputUrl(url)}  %c ${delta}ms `,
      handleStyle(COLOR.SUCCESS),
      `color: ${COLOR.SUCCESS}`,
      `color: ${COLOR.WARN}`
    );
  }
}
