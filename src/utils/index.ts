import { USER_INFO } from "@/constants/app";
import { getCache } from "./uni-app";

/**
 * 检查缓存中是否存在token
 * @param needToken
 * @returns
 */
 export function checkToken(needToken: boolean = true): boolean {
  if (!needToken) return true;

  const { token } = getCache(USER_INFO);

  return !!token;
}
