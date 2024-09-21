// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取Features GET /api/basic-management/feature */
export async function getBasicManagementFeature(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBasicManagementFeatureParams,
  options?: { [key: string]: any },
) {
  return request<API.GetFeatureListResultDto>('/api/basic-management/feature', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新Features POST /api/basic-management/feature */
export async function postBasicManagementFeature(
  body: API.UpdateFeatureInput,
  options?: { [key: string]: any },
) {
  return request<any>('/api/basic-management/feature', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除Features DELETE /api/basic-management/feature */
export async function deleteBasicManagementFeature(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteBasicManagementFeatureParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/basic-management/feature', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
