using Fd.Kit.BasicManagement.IdentitySecurityLogs;
using Fd.Kit.BasicManagement.Permissions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace Fd.Kit.BasicManagement.IdentitySecurityLogs;

public class IdentitySecurityLogAppService : BasicManagementAppService, IIdentitySecurityLogAppService
{
    private readonly IIdentitySecurityLogRepository _identitySecurityLogRepository;

    public IdentitySecurityLogAppService(IIdentitySecurityLogRepository identitySecurityLogRepository)
    {
        _identitySecurityLogRepository = identitySecurityLogRepository;
    }

    [Authorize(Policy = BasicManagementPermissions.SystemManagement.IdentitySecurityLog)]
    public virtual async Task<PagedResultDto<IdentitySecurityLogDto>> GetListAsync(GetIdentitySecurityLogListInput input)
    {
        var totalCount = await _identitySecurityLogRepository.GetCountAsync(
            input.StartTime,
            input.EndTime,
            input.ApplicationName,
            input.Identity,
            input.RequestUrl,
            input.UserId,
            input.UserName,
            input.ClientId,
            input.CorrelationId);

        var list = await _identitySecurityLogRepository.GetListAsync(
            input.Sorting,
            input.MaxResultCount,
            input.SkipCount,
            input.StartTime,
            input.EndTime,
            input.ApplicationName,
            input.Identity,
            input.RequestUrl,
            input.UserId,
            input.UserName,
            input.ClientId,
            input.CorrelationId);

        return new PagedResultDto<IdentitySecurityLogDto>(totalCount, ObjectMapper.Map<List<IdentitySecurityLog>, List<IdentitySecurityLogDto>>(list));
    }
}