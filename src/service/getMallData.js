import fetch from '../config/mallFetch'
import {getStore} from '../config/mUtils'



/**
 * 获取首页默认地址
 */
export const getData = () => fetch('/integral.particulars', {
  inuserId:1,
  eid:44,
});

/**
 * 手机号登录
 */
export  const sendLogin = (code, mobile, validate_token) => fetch('/v1/login/app_mobile', {
  code,
  mobile,
  validate_token
}, 'POST');
