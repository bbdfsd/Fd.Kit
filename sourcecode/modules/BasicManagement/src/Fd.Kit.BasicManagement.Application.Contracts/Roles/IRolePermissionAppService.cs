using Fd.Kit.BasicManagement.Roles.Dtos;
using Volo.Abp.Application.Services;

namespace Fd.Kit.BasicManagement.Roles
{
    public interface IRolePermissionAppService : IApplicationService
    {

        Task<PermissionOutput> GetPermissionAsync(GetPermissionInput input);

        Task UpdatePermissionAsync(UpdateRolePermissionsInput input);
    }
}