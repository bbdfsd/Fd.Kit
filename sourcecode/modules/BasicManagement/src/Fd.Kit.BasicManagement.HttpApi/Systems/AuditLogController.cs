using Fd.Kit.BasicManagement.AuditLogs;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.AspNetCore.Mvc;

namespace Fd.Kit.BasicManagement.Systems
{
    [Area(BasicManagementRemoteServiceConsts.ModuleName)]
    [RemoteService(Name = BasicManagementRemoteServiceConsts.RemoteServiceName)]
    [Route("api/audit-logging/audit-logs")]
    public class AuditLogController : AbpControllerBase, IAuditLogsAppService
    {
        protected IAuditLogsAppService AuditLogsAppService { get; }

        public AuditLogController(IAuditLogsAppService auditLogsAppService)
        {
            AuditLogsAppService = auditLogsAppService;
        }

        [HttpGet]
        public virtual async Task<PagedResultDto<AuditLogDto>> GetListAsync(GetAuditLogListDto input)
        {
            return await AuditLogsAppService.GetListAsync(input);
        }

        [HttpGet]
        [Route("{id}")]
        public virtual async Task<AuditLogDto> GetAsync(Guid id)
        {
            return await AuditLogsAppService.GetAsync(id);
        }

        [HttpGet]
        [Route("statistics/error-rate")]
        public virtual async Task<GetErrorRateOutput> GetErrorRateAsync(GetErrorRateFilter filter)
        {
            return await AuditLogsAppService.GetErrorRateAsync(filter);
        }

        [HttpGet]
        [Route("statistics/average-execution-duration-per-day")]
        public virtual async Task<GetAverageExecutionDurationPerDayOutput> GetAverageExecutionDurationPerDayAsync(GetAverageExecutionDurationPerDayInput filter)
        {
            return await AuditLogsAppService.GetAverageExecutionDurationPerDayAsync(filter);
        }

        [HttpGet]
        [Route("entity-changes/")]
        public virtual async Task<PagedResultDto<EntityChangeDto>> GetEntityChangesAsync(GetEntityChangesDto input)
        {
            return await AuditLogsAppService.GetEntityChangesAsync(input);
        }

        [HttpGet]
        [Route("entity-changes-with-username/")]
        public virtual async Task<List<EntityChangeWithUsernameDto>> GetEntityChangesWithUsernameAsync(EntityChangeFilter input)
        {
            return await AuditLogsAppService.GetEntityChangesWithUsernameAsync(input);
        }

        [HttpGet]
        [Route("entity-change-with-username/{entityChangeId}")]
        public virtual async Task<EntityChangeWithUsernameDto> GetEntityChangeWithUsernameAsync(Guid entityChangeId)
        {
            return await AuditLogsAppService.GetEntityChangeWithUsernameAsync(entityChangeId);
        }

        [HttpGet]
        [Route("entity-changes/{entityChangeId}")]
        public virtual async Task<EntityChangeDto> GetEntityChangeAsync(Guid entityChangeId)
        {
            return await AuditLogsAppService.GetEntityChangeAsync(entityChangeId);
        }
    }

}