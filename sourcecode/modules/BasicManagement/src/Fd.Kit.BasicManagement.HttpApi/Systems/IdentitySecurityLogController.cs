using Fd.Kit.BasicManagement.IdentitySecurityLogs;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;

namespace Fd.Kit.BasicManagement.Systems;

[Area(BasicManagementRemoteServiceConsts.ModuleName)]
[RemoteService(Name = BasicManagementRemoteServiceConsts.RemoteServiceName)]
[Route("api/identity/security-logs")]
public class IdentitySecurityLogController : BasicManagementController, IIdentitySecurityLogAppService
{
    private readonly IIdentitySecurityLogAppService _identitySecurityLogAppService;

    public IdentitySecurityLogController(IIdentitySecurityLogAppService identitySecurityLogAppService)
    {
        _identitySecurityLogAppService = identitySecurityLogAppService;
    }

    [HttpGet]
    [SwaggerOperation(summary: "分页获取登录日志信息", Tags = new[] { "IdentitySecurityLogs" })]
    public Task<PagedResultDto<IdentitySecurityLogDto>> GetListAsync(GetIdentitySecurityLogListInput input)
    {
        return _identitySecurityLogAppService.GetListAsync(input);
    }
}