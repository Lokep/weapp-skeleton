import { IResponse } from './../types/request.d';
// import store from '../store/index';
import crypto from "crypto-js";
import { Base64 } from "js-base64";

import { getOSSKeys } from "../api/app";

// 计算签名。
function computeSignature(accessKeySecret: string, canonicalString: string) {
  return crypto.enc.Base64.stringify(
    crypto.HmacSHA1(canonicalString, accessKeySecret)
  );
}

const date = new Date();
date.setHours(date.getHours() + 1);
const policyText = {
  expiration: date.toISOString(), // 设置policy过期时间。
  conditions: [
    // 限制上传大小。
    ["content-length-range", 0, 1024 * 1024 * 1024],
  ],
};

async function getFormDataParams() {
  const result = await getOSSKeys();
  const { accessKeyId, stsToken, accessKeySecret, expiration } = result.data as IResponse;

  const policy = Base64.encode(JSON.stringify({ ...policyText, expiration })); // policy必须为base64的string。
  const signature = computeSignature(accessKeySecret, policy);
  const formData = {
    OSSAccessKeyId: accessKeyId,
    signature,
    policy,
    "x-oss-security-token": stsToken,
  };
  return formData;
}

/**
 * oss直传
 * 在通用方法中不对参数做限制，除了必须传递的参数外
 *
 * @param {Object}
 * @field src {String} 图片的本地路径
 * @field key {String} 图片在oss上路径
 * @field compress {Boolean | Number} 是否压缩 或 压缩度
 */
export default async ({ src, key }: { src: string; key: string }) => {
  const formData = await getFormDataParams();
  let filePath = src;

  return new Promise((resolve) => {
    uni.uploadFile({
      url: "https://oss.lanniuh.com/", // 开发者服务器的URL。
      filePath,
      name: "file", // 必须填file。
      formData: {
        ...formData,
        key,
      },
      success: (res) => {
        if (res.statusCode === 204) {
          resolve(`https://oss.lanniuh.com/${key}`);
        }
      },
      fail: (err) => {
        console.error(err);
        resolve(false);
      },
    });
  });
};
