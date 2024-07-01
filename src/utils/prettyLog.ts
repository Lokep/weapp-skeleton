import { consolePrint, consoleText } from 'console-powers';
import { slice, split } from 'lodash-es';
import type { CSSProperties } from 'vue';

enum LogLevel {
  PRIMARY = 'primary',
  WARN = 'warn',
  DANGER = 'danger',
  SUCCESS = 'success',
}

const COLOR = {
  [LogLevel.PRIMARY]: '#409EFF',
  [LogLevel.SUCCESS]: '#67C23A',
  [LogLevel.WARN]: '#E6A23C',
  [LogLevel.DANGER]: '#F56C6C',
};

const tagStyle = (logLevel: LogLevel)  => ({
  background: COLOR[logLevel],
  borderRadius: '2px',
  padding: '3px 2px',
  textAlign: 'center',
  color: '#fff',
  fontWeight: 400,
  width: '30pt'
});

export const magicString = (str: string) => {
  const MAX_LENGTH = 15;
  const list = split(str, /\/|\?/g)
  const [last] =slice(list, -1);
  const [lastButOne] = slice(list, -2);

  return last.length > MAX_LENGTH ?  last : `${lastButOne}/${last}`;
}




export function prettyLog(title: string, text: string, level: LogLevel = LogLevel.PRIMARY, style: CSSProperties = {}) {
  consolePrint(
    // @ts-ignore
    consoleText(title, tagStyle(level)),
    // @ts-ignore
    consoleText(text, {...style, marginLeft: '4px', color: COLOR[level]}),
  )
}