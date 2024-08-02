using Fd.Kit.BasicManagement.IdentitySecurityLogs;
using Fd.Kit.BasicManagement.Permissions;
using Microsoft.AspNetCore.Authorization;
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
    public virtual async Task<PagedResultDto<PagingIdentitySecurityLogOutput>> GetListAsync(PagingIdentitySecurityLogInput input)
    {
        var totalCount = await _identitySecurityLogRepository.GetCountAsync(
            input.StartTime,
            input.EndTime,
            input.ApplicationName,
            input.Identity,
            input.Action,
            input.UserId,
            input.UserName,
            input.ClientId,
            input.CorrelationId);
        if (totalCount == 0)
        {
            return new PagedResultDto<PagingIdentitySecurityLogOutput>();
        }

        var list = await _identitySecurityLogRepository.GetListAsync(
            input.Sorting,
            input.MaxResultCount,
            input.SkipCount,
            input.StartTime,
            input.EndTime,
            input.ApplicationName,
            input.Identity,
            input.Action,
            input.UserId,
            input.UserName,
            input.ClientId,
            input.CorrelationId);

        return new PagedResultDto<PagingIdentitySecurityLogOutput>(totalCount, ObjectMapper.Map<List<IdentitySecurityLog>, List<PagingIdentitySecurityLogOutput>>(list));
    }
}