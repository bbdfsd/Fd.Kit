// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页获取角色 GET /api/identity/roles */
export async function getIdentityRoles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getIdentityRolesParams,
  options?: { [key: string]: any },
) {
  return request<API.IdentityRoleDtoPagedResultDto>('/api/identity/roles', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建角色 POST /api/identity/roles */
export async function postIdentityRoles(
  body: API.IdentityRoleCreateDto,
  options?: { [key: string]: any },
) {
  return request<API.IdentityRoleDto>('/api/identity/roles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据Id获取角色 GET /api/identity/roles/${param0} */
export async function getIdentityRolesId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getIdentityRolesIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.IdentityRoleDto>(`/api/identity/roles/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新角色 PUT /api/identity/roles/${param0} */
export async function putIdentityRolesId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putIdentityRolesIdParams,
  body: API.UpdateRoleInput,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.IdentityRoleDto>(`/api/identity/roles/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除角色 DELETE /api/identity/roles/${param0} */
export async function deleteIdentityRolesId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteIdentityRolesIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/identity/roles/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取所有角色 GET /api/identity/roles/all */
export async function getIdentityRolesAll(options?: { [key: string]: any }) {
  return request<API.IdentityRoleDtoListResultDto>('/api/identity/roles/all', {
    method: 'GET',
    ...(options || {}),
  });
}
