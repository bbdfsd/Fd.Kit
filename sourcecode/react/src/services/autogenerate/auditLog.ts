// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/audit-logging/audit-logs */
export async function getAuditLoggingAuditLogs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAuditLoggingAuditLogsParams,
  options?: { [key: string]: any },
) {
  return request<API.AuditLogDtoPagedResultDto>('/api/audit-logging/audit-logs', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/audit-logging/audit-logs/${param0} */
export async function getAuditLoggingAuditLogsId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAuditLoggingAuditLogsIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.AuditLogDto>(`/api/audit-logging/audit-logs/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/audit-logging/audit-logs/entity-change-with-username/${param0} */
export async function getAuditLoggingAuditLogsEntityChangeWithUsernameEntityChangeId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAuditLoggingAuditLogsEntityChangeWithUsernameEntityChangeIdParams,
  options?: { [key: string]: any },
) {
  const { entityChangeId: param0, ...queryParams } = params;
  return request<API.EntityChangeWithUsernameDto>(
    `/api/audit-logging/audit-logs/entity-change-with-username/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/audit-logging/audit-logs/entity-changes */
export async function getAuditLoggingAuditLogsEntityChanges(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAuditLoggingAuditLogsEntityChangesParams,
  options?: { [key: string]: any },
) {
  return request<API.EntityChangeDtoPagedResultDto>(
    '/api/audit-logging/audit-logs/entity-changes',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/audit-logging/audit-logs/entity-changes-with-username */
export async function getAuditLoggingAuditLogsEntityChangesWithUsername(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAuditLoggingAuditLogsEntityChangesWithUsernameParams,
  options?: { [key: string]: any },
) {
  return request<API.EntityChangeWithUsernameDto[]>(
    '/api/audit-logging/audit-logs/entity-changes-with-username',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/audit-logging/audit-logs/entity-changes/${param0} */
export async function getAuditLoggingAuditLogsEntityChangesEntityChangeId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAuditLoggingAuditLogsEntityChangesEntityChangeIdParams,
  options?: { [key: string]: any },
) {
  const { entityChangeId: param0, ...queryParams } = params;
  return request<API.EntityChangeDto>(`/api/audit-logging/audit-logs/entity-changes/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/audit-logging/audit-logs/statistics/average-execution-duration-per-day */
export async function getAuditLoggingAuditLogsStatisticsAverageExecutionDurationPerDay(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAuditLoggingAuditLogsStatisticsAverageExecutionDurationPerDayParams,
  options?: { [key: string]: any },
) {
  return request<API.GetAverageExecutionDurationPerDayOutput>(
    '/api/audit-logging/audit-logs/statistics/average-execution-duration-per-day',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/audit-logging/audit-logs/statistics/error-rate */
export async function getAuditLoggingAuditLogsStatisticsErrorRate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAuditLoggingAuditLogsStatisticsErrorRateParams,
  options?: { [key: string]: any },
) {
  return request<API.GetErrorRateOutput>('/api/audit-logging/audit-logs/statistics/error-rate', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
