// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页获取登录日志信息 GET /api/identity/security-logs */
export async function getIdentitySecurityLogs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getIdentitySecurityLogsParams,
  options?: { [key: string]: any },
) {
  return request<API.IdentitySecurityLogDtoPagedResultDto>('/api/identity/security-logs', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
