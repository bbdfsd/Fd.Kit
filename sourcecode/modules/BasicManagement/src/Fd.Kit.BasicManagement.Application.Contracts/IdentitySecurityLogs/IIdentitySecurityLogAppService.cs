using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Fd.Kit.BasicManagement.IdentitySecurityLogs;

public interface IIdentitySecurityLogAppService : IApplicationService
{
    /// <summary>
    /// 分页获取登录日志
    /// </summary>
    Task<PagedResultDto<IdentitySecurityLogDto>> GetListAsync(GetIdentitySecurityLogListInput input);
}