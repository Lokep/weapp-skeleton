import { isArray, isNumber, isObject, isString } from './index';
import { env } from './uni-app';

const COLOR = {
  PRIMARY: '#409EFF',
  SUCCESS: '#67C23A',
  WARN: '#E6A23C',
  DANGER: '#F56C6C',
};

export const logger = (req, res) => {
  if (env === 'release') {
    return;
  }

  const { url, method = 'GET', isMock = false } = req;

  if (isMock) {
    return;
  }

  handleCallback({ method, url }, res);
};

function handleStyle(status) {
  return `background: ${COLOR[status.toUpperCase()]};
          border-radius: 2px;
          padding: 3px 2px; text-align: center;
          color: #fff;
          font-weight: 400;
          width: 30pt;`;
}

function handleOutputUrl(url) {
  const MAX_LENGTH = 15;
  const urlArray = url.split('?')[0].split('/');
  return urlArray.slice(urlArray[urlArray.length - 1].length > MAX_LENGTH ? -1 : -2).join('/');
}

function handleCallback({ method, url }, { data: res, delta }) {
  if (res.res !== 0) {
    console.log(
      `%c ${method.toUpperCase()} %c ${handleOutputUrl(url)}  %c ${delta}ms %c ${res.msg} `,
      handleStyle('warn'),
      `color: ${COLOR.WARN}`,
      `color: ${COLOR.WARN}`,
      `color: ${COLOR.DANGER}`,
    );

    return;
  }

  if (res.data && isArray(res.data) && res.data.length > 0) {
    if (isNumber(res.data[0]) || isString(res.data[0])) {
      console.groupCollapsed(
        `%c ${method.toUpperCase()} %c ${handleOutputUrl(url)}  %c ${delta}ms `,
        handleStyle('success'),
        `color: ${COLOR.SUCCESS};font-weight: 400;`,
        `color: ${COLOR.WARN};font-weight: 400;`,
      );
      console.table(res.data);
      console.groupEnd('');
    } else if (isObject(res.data[0])) {
      console.groupCollapsed(
        `%c ${method.toUpperCase()} %c ${handleOutputUrl(url)}  %c ${delta}ms `,
        handleStyle('success'),
        `color: ${COLOR.SUCCESS};font-weight: 400;`,
        `color: ${COLOR.WARN};font-weight: 400;`,
      );

      const tableHeader = Object.keys(res.data[0]);
      console.table(res.data, tableHeader);
      console.groupEnd('');
    }
  } else {
    console.log(
      `%c ${method.toUpperCase()} %c ${handleOutputUrl(url)}  %c ${delta}ms `,
      handleStyle('success'),
      `color: ${COLOR.SUCCESS}`,
      `color: ${COLOR.WARN}`,
    );
  }
}
