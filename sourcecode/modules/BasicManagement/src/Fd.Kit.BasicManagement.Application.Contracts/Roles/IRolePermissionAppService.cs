using Fd.Kit.BasicManagement.Roles.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.PermissionManagement;

namespace Fd.Kit.BasicManagement.Roles
{
    public interface IRolePermissionAppService : IApplicationService
    {

        Task<GetPermissionListResultDto> GetPermissionAsync([FromQuery] string providerName, [FromQuery] string providerKey);

        Task UpdatePermissionAsync([FromQuery] string providerName, [FromQuery] string providerKey, UpdatePermissionsDto input);
    }
}