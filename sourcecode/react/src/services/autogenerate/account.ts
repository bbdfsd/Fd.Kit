// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 修改当前用户密码 PUT /api/basic-management/account/change-password */
export async function putBasicManagementAccountChangePassword(
  body: API.ChangePasswordInput,
  options?: { [key: string]: any },
) {
  return request<boolean>('/api/basic-management/account/change-password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 登录 POST /api/basic-management/account/login */
export async function postBasicManagementAccountLogin(
  body: API.LoginInput,
  options?: { [key: string]: any },
) {
  return request<API.LoginOutput>('/api/basic-management/account/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
