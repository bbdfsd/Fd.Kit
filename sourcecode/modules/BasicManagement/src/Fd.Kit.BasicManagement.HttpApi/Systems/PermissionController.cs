using Fd.Kit.BasicManagement.Roles;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.PermissionManagement;

namespace Fd.Kit.BasicManagement.Systems
{

    [Area(BasicManagementRemoteServiceConsts.ModuleName)]
    [RemoteService(Name = BasicManagementRemoteServiceConsts.RemoteServiceName)]
    [Route("api/permission-management/permissions")]
    public class PermissionController : BasicManagementController, IRolePermissionAppService
    {
        private readonly IRolePermissionAppService _rolePermissionAppService;

        public PermissionController(IRolePermissionAppService rolePermissionAppService)
        {
            _rolePermissionAppService = rolePermissionAppService;
        }

        [HttpGet]
        [SwaggerOperation(summary: "获取角色权限", Tags = new[] { "Permissions" })]
        public Task<GetPermissionListResultDto> GetPermissionAsync([FromQuery] string providerName, [FromQuery] string providerKey)
        {
            return _rolePermissionAppService.GetPermissionAsync(providerName,providerKey);
        }

        [HttpPut]
        [SwaggerOperation(summary: "更新角色", Tags = new[] { "Permissions" })]
        public Task UpdatePermissionAsync([FromQuery] string providerName, [FromQuery] string providerKey, UpdatePermissionsDto input)
        {
            return _rolePermissionAppService.UpdatePermissionAsync(providerName, providerKey, input);
        }
    }
}