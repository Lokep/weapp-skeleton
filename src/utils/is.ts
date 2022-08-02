// 检查是否为邮箱
export const isEmail = (s: string) => {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(
    s
  );
};

export const isMobile = (s: string) => {
  return /^1[3-9][0-9]{9}$/.test(s);
};

export const isURL = (s: string) => {
  return /^http[s]?:\/\/.*/.test(s);
};

export const isString = <T>(o: T): boolean => {
  return Object.prototype.toString.call(o).slice(8, -1) === "String";
};

export const isNumber = <T>(o: T): boolean => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Number";
};

export const isBoolean = <T>(o: T): boolean => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Boolean";
};

export const isFunction = <T>(o: T): boolean => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Function";
};

export const isAsyncFunction = <T>(o: T): boolean => {
  return Object.prototype.toString.call(o).slice(8, -1) === "AsyncFunction";
};

export const isNull = <T>(o: T): boolean => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Null";
};

export const isUndefined = <T>(o: T): boolean => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Undefined";
};

export const isObject = <T>(o: T): boolean => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Object";
};

// true 表示对象为空
export const isObjectEmpty = <T>(o: T): boolean => {
  if (!isObject(o)) return false;
  return Object.keys(o).length <= 0;
};

export const isArray = <T>(o: T): boolean => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Array";
};

export const isPromise = <T>(o: T): boolean => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Promise";
};

export const formatNumber = (n: number): string => {
  if (!isNumber(n) && !isString(n)) {
    return "";
  }

  const num: string = String(n);

  return num[1] ? num : `0${num}`;
};
