// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页获取租户信息 GET /api/saas/tenants */
export async function getSaasTenants(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSaasTenantsParams,
  options?: { [key: string]: any },
) {
  return request<API.TenantDtoPagedResultDto>('/api/saas/tenants', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建租户 POST /api/saas/tenants */
export async function postSaasTenants(body: API.TenantCreateDto, options?: { [key: string]: any }) {
  return request<API.TenantDto>('/api/saas/tenants', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新租户 PUT /api/saas/tenants/${param0} */
export async function putSaasTenantsId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putSaasTenantsIdParams,
  body: API.UpdateTenantInput,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TenantDto>(`/api/saas/tenants/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除租户 DELETE /api/saas/tenants/${param0} */
export async function deleteSaasTenantsId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteSaasTenantsIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/saas/tenants/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取指定租户的连接字符串 GET /api/saas/tenants/${param0}/connection-strings */
export async function getSaasTenantsIdConnectionStrings(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSaasTenantsIdConnectionStringsParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<string>(`/api/saas/tenants/${param0}/connection-strings`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 新增或者更新租户所有连接字符串 PUT /api/saas/tenants/${param0}/connection-strings */
export async function putSaasTenantsIdConnectionStrings(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putSaasTenantsIdConnectionStringsParams,
  body: API.SassTenantConnectionStringInputDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/saas/tenants/${param0}/connection-strings`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 通过名称获取租户信息 GET /api/saas/tenants/name */
export async function getSaasTenantsName(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSaasTenantsNameParams,
  options?: { [key: string]: any },
) {
  return request<API.FindTenantResultDto>('/api/saas/tenants/name', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
