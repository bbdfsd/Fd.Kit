// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页获取用户信息 GET /api/identity/users */
export async function getIdentityUsers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getIdentityUsersParams,
  options?: { [key: string]: any },
) {
  return request<API.FdUserDtoPagedResultDto>('/api/identity/users', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建用户 POST /api/identity/users */
export async function postIdentityUsers(
  body: API.IdentityUserCreateDto,
  options?: { [key: string]: any },
) {
  return request<API.IdentityUserDto>('/api/identity/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据Id查询用户信息 GET /api/identity/users/${param0} */
export async function getIdentityUsersId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getIdentityUsersIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.FdUserDto>(`/api/identity/users/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 编辑用户 PUT /api/identity/users/${param0} */
export async function putIdentityUsersId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putIdentityUsersIdParams,
  body: API.UpdateUserInput,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.IdentityUserDto>(`/api/identity/users/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 DELETE /api/identity/users/${param0} */
export async function deleteIdentityUsersId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteIdentityUsersIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/identity/users/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 锁定用户 PUT /api/identity/users/${param0}/lock */
export async function putIdentityUsersIdLock(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putIdentityUsersIdLockParams,
  body: API.LockUserInput,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/identity/users/${param0}/lock`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询指定用户的组织信息 & 组织角色 GET /api/identity/users/${param0}/organization-units */
export async function getIdentityUsersIdOrganizationUnits(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getIdentityUsersIdOrganizationUnitsParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.OrganizationUnitDto[]>(`/api/identity/users/${param0}/organization-units`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取用户角色信息 GET /api/identity/users/${param0}/roles */
export async function getIdentityUsersIdRoles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getIdentityUsersIdRolesParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.IdentityRoleDtoListResultDto>(`/api/identity/users/${param0}/roles`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取全部用户信息 GET /api/identity/users/all */
export async function getIdentityUsersAll(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getIdentityUsersAllParams,
  options?: { [key: string]: any },
) {
  return request<API.IdentityUserDto[]>('/api/identity/users/all', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导出用户列表 POST /api/identity/users/export-as-excel */
export async function postIdentityUsersExportAsExcel(
  body: API.PagingUserListInput,
  options?: { [key: string]: any },
) {
  return request<any>('/api/identity/users/export-as-excel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
