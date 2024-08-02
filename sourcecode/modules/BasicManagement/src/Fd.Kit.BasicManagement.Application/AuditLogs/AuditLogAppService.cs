using Fd.Kit.BasicManagement.AuditLogs;
using Fd.Kit.BasicManagement.Permissions;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Application.Dtos;
using Volo.Abp.AuditLogging;

namespace Fd.Kit.BasicManagement.AuditLogs
{
    [Authorize(Policy = BasicManagementPermissions.SystemManagement.AuditLog)]
    public class AuditLogAppService : BasicManagementAppService, IAuditLogAppService
    {
        private readonly IAuditLogRepository _auditLogRepository;

        public AuditLogAppService(IAuditLogRepository auditLogRepository)
        {
            _auditLogRepository = auditLogRepository;
        }


        /// <summary>
        /// 分页查询审计日志
        /// </summary>
        [Authorize(Policy = BasicManagementPermissions.SystemManagement.AuditLog)]
        public virtual async Task<PagedResultDto<PagingAuditLogOutput>> GetListAsync(PagingAuditLogInput input)
        {
            var totalCount = await _auditLogRepository.GetCountAsync(
                input.StartTime,
                input.EndTime,
                input.HttpMethod,
                input.Url,
                input.ClientIp,
                input.UserId,
                input.UserName,
                input.ApplicationName,
                input.ClientIpAddress,
                input.CorrelationId,
                input.MaxExecutionDuration,
                input.MinExecutionDuration,
                input.HasException,
                input.HttpStatusCode);
            if (totalCount == 0)
            {
                return new PagedResultDto<PagingAuditLogOutput>();
            }

            var list = await _auditLogRepository.GetListAsync(
                input.Sorting,
                input.MaxResultCount,
                input.SkipCount,
                input.StartTime,
                input.EndTime,
                input.HttpMethod,
                input.Url,
                input.ClientIp,
                input.UserId,
                input.UserName,
                input.ApplicationName,
                input.ClientIpAddress,
                input.CorrelationId,
                input.MaxExecutionDuration,
                input.MinExecutionDuration,
                input.HasException,
                input.HttpStatusCode,
                true);

            return new PagedResultDto<PagingAuditLogOutput>(totalCount, ObjectMapper.Map<List<AuditLog>, List<PagingAuditLogOutput>>(list));
        }
    }
}