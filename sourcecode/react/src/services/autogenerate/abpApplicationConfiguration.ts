// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/abp/application-configuration */
export async function getAbpApplicationConfiguration(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAbpApplicationConfigurationParams,
  options?: { [key: string]: any },
) {
  return request<API.ApplicationConfigurationDto>('/api/abp/application-configuration', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
