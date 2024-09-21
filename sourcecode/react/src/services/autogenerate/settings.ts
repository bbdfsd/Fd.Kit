// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取所有Setting GET /api/basic-management/settings */
export async function getBasicManagementSettings(options?: { [key: string]: any }) {
  return request<API.SettingOutput[]>('/api/basic-management/settings', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新Setting POST /api/basic-management/settings */
export async function postBasicManagementSettings(
  body: API.UpdateSettingInput,
  options?: { [key: string]: any },
) {
  return request<any>('/api/basic-management/settings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
