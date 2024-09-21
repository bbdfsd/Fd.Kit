// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建组织机构 POST /api/identity/organization-units */
export async function postIdentityOrganizationUnits(
  body: API.CreateOrganizationUnitInput,
  options?: { [key: string]: any },
) {
  return request<any>('/api/identity/organization-units', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取特定组织机构 GET /api/identity/organization-units/${param0} */
export async function getIdentityOrganizationUnitsId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getIdentityOrganizationUnitsIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.OrganizationUnitDto>(`/api/identity/organization-units/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 编辑组织机构 PUT /api/identity/organization-units/${param0} */
export async function putIdentityOrganizationUnitsId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putIdentityOrganizationUnitsIdParams,
  body: API.UpdateOrganizationUnitInput,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/identity/organization-units/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除组织机构 DELETE /api/identity/organization-units/${param0} */
export async function deleteIdentityOrganizationUnitsId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteIdentityOrganizationUnitsIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/identity/organization-units/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取不在组织机构的角色 GET /api/identity/organization-units/${param0}/available-roles */
export async function getIdentityOrganizationUnitsIdAvailableRoles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getIdentityOrganizationUnitsIdAvailableRolesParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.GetUnAddRoleOutputPagedResultDto>(
    `/api/identity/organization-units/${param0}/available-roles`,
    {
      method: 'GET',
      params: {
        ...queryParams,
      },
      ...(options || {}),
    },
  );
}

/** 获取不在组织机构的用户 GET /api/identity/organization-units/${param0}/available-users */
export async function getIdentityOrganizationUnitsIdAvailableUsers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getIdentityOrganizationUnitsIdAvailableUsersParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.GetUnAddUserOutputPagedResultDto>(
    `/api/identity/organization-units/${param0}/available-users`,
    {
      method: 'GET',
      params: {
        ...queryParams,
      },
      ...(options || {}),
    },
  );
}

/** 分页获取组织机构下用户 GET /api/identity/organization-units/${param0}/members */
export async function getIdentityOrganizationUnitsIdMembers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getIdentityOrganizationUnitsIdMembersParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.GetOrganizationUnitUserOutputPagedResultDto>(
    `/api/identity/organization-units/${param0}/members`,
    {
      method: 'GET',
      params: {
        ...queryParams,
      },
      ...(options || {}),
    },
  );
}

/** 向组织机构添加用户 PUT /api/identity/organization-units/${param0}/members */
export async function putIdentityOrganizationUnitsIdMembers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putIdentityOrganizationUnitsIdMembersParams,
  body: API.AddUserToOrganizationUnitInput,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/identity/organization-units/${param0}/members`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 向组织机构删除用户 DELETE /api/identity/organization-units/${param0}/members/${param1} */
export async function deleteIdentityOrganizationUnitsIdMembersUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteIdentityOrganizationUnitsIdMembersUserIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, userId: param1, ...queryParams } = params;
  return request<any>(`/api/identity/organization-units/${param0}/members/${param1}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页获取组织机构下角色 GET /api/identity/organization-units/${param0}/roles */
export async function getIdentityOrganizationUnitsIdRoles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getIdentityOrganizationUnitsIdRolesParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.GetOrganizationUnitRoleOutputPagedResultDto>(
    `/api/identity/organization-units/${param0}/roles`,
    {
      method: 'GET',
      params: {
        ...queryParams,
      },
      ...(options || {}),
    },
  );
}

/** 向组织机构添加角色 PUT /api/identity/organization-units/${param0}/roles */
export async function putIdentityOrganizationUnitsIdRoles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putIdentityOrganizationUnitsIdRolesParams,
  body: API.AddRoleToOrganizationUnitInput,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/identity/organization-units/${param0}/roles`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 向组织机构删除角色 DELETE /api/identity/organization-units/${param0}/roles/${param1} */
export async function deleteIdentityOrganizationUnitsIdRolesRoleId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteIdentityOrganizationUnitsIdRolesRoleIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, roleId: param1, ...queryParams } = params;
  return request<any>(`/api/identity/organization-units/${param0}/roles/${param1}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取组织机构树 GET /api/identity/organization-units/all */
export async function getIdentityOrganizationUnitsAll(options?: { [key: string]: any }) {
  return request<API.OrganizationUnitDto[]>('/api/identity/organization-units/all', {
    method: 'GET',
    ...(options || {}),
  });
}
