using Fd.Kit.BasicManagement.FdCores;
using Fd.Kit.BasicManagement.Roles;
using Fd.Kit.BasicManagement.Roles.Dtos;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace Fd.Kit.BasicManagement.Systems
{
    [Area(BasicManagementRemoteServiceConsts.ModuleName)]
    [RemoteService(Name = BasicManagementRemoteServiceConsts.RemoteServiceName)]
    [Route("api/identity/roles")]
    public class RoleController : BasicManagementController, IRoleAppService
    {
        private readonly IRoleAppService _roleAppService;

        public RoleController(IRoleAppService roleAppService)
        {
            _roleAppService = roleAppService;
        }

        [HttpGet]
        [Route("all")]
        [SwaggerOperation(summary: "获取所有角色", Tags = new[] { "Roles" })]
        public Task<ListResultDto<IdentityRoleDto>> GetAllAsync()
        {
            return _roleAppService.GetAllAsync();
        }

        [HttpGet]
        [SwaggerOperation(summary: "分页获取角色", Tags = new[] { "Roles" })]
        public Task<PagedResultDto<IdentityRoleDto>> GetListAsync(PagingRoleListInput input)
        {
            return _roleAppService.GetListAsync(input);
        }
        [HttpGet]
        [Route("{id}")]
        [SwaggerOperation(summary: "根据Id获取角色", Tags = new[] { "Roles" })]
        public Task<IdentityRoleDto> GetAsync(Guid id)
        {
            return _roleAppService.GetAsync(id);
        }

        [HttpPost]
        [SwaggerOperation(summary: "创建角色", Tags = new[] { "Roles" })]
        public Task<IdentityRoleDto> CreateAsync(IdentityRoleCreateDto input)
        {
            return _roleAppService.CreateAsync(input);
        }

        [HttpPut]
        [Route("{id}")]
        [SwaggerOperation(summary: "更新角色", Tags = new[] { "Roles" })]
        public Task<IdentityRoleDto> UpdateAsync(Guid id, UpdateRoleInput input)
        {
            return _roleAppService.UpdateAsync(id, input);
        }

        [HttpDelete]
        [Route("{id}")]
        [SwaggerOperation(summary: "删除角色", Tags = new[] { "Roles" })]
        public Task DeleteAsync(Guid id)
        {
            return _roleAppService.DeleteAsync(id);
        }
    }
}