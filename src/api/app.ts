import { axios } from '@/utils/request';
import { env } from '@/utils/uni-app';

// oss直传获取token等字段
export const getOSSKeys = () =>
  axios({
    url:
      env === 'release'
        ? 'https://entrance.lanniuh.com/updata-pub/oss/sts-token'
        : 'http://192.168.3.94:5643/oss/sts-token',
    showLoading: false,
    showErrMsg: false,
  });