using Fd.Kit.BasicManagement.OrganizationUnits.Dto;
using Fd.Kit.BasicManagement.Users;
using Fd.Kit.BasicManagement.Users.Dtos;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace Fd.Kit.BasicManagement.Systems
{
    [Area(BasicManagementRemoteServiceConsts.ModuleName)]
    [RemoteService(Name = BasicManagementRemoteServiceConsts.RemoteServiceName)]
    [Route("api/identity/users")]
    public class UserController : BasicManagementController, IUserAppService
    {
        private readonly IUserAppService _userAppService;

        public UserController(IUserAppService userAppService)
        {
            _userAppService = userAppService;
        }

        [HttpGet]
        [SwaggerOperation(summary: "分页获取用户信息", Tags = new[] { "Users" })]
        public Task<PagedResultDto<FdUserDto>> GetListAsync(PagingUserListInput input)
        {
            return _userAppService.GetListAsync(input);
        }

        [HttpGet]
        [Route("all")]
        [SwaggerOperation(summary: "获取全部用户信息", Tags = new[] { "Users" })]
        public Task<List<IdentityUserDto>> GetAllAsync(PagingUserListInput input)
        {
            return _userAppService.GetAllAsync(input);
        }

        [HttpGet]
        [Route("{id}")]
        [SwaggerOperation(summary: "根据Id查询用户信息", Tags = new[] { "Users" })]
        public Task<FdUserDto> GetAsync(Guid id)
        {
            return _userAppService.GetAsync(id);
        }

        [HttpPost]
        [Route("export-as-excel")]
        [SwaggerOperation(summary: "导出用户列表", Tags = new[] { "Users" })]
        [ProducesResponseType(typeof(FileContentResult), (int)HttpStatusCode.OK)]
        public Task<ActionResult> ExportAsync(PagingUserListInput input)
        {
            return _userAppService.ExportAsync(input);
        }

        [HttpPost]
        [SwaggerOperation(summary: "创建用户", Tags = new[] { "Users" })]
        public Task<IdentityUserDto> CreateAsync(IdentityUserCreateDto input)
        {
            return _userAppService.CreateAsync(input);
        }

        [HttpPut]
        [Route("{id}")]
        [SwaggerOperation(summary: "编辑用户", Tags = new[] { "Users" })]
        public Task<IdentityUserDto> UpdateAsync(Guid id, UpdateUserInput input)
        {
            return _userAppService.UpdateAsync(id, input);
        }

        [HttpDelete]
        [Route("{id}")]
        [SwaggerOperation(summary: "删除用户", Tags = new[] { "Users" })]
        public Task DeleteAsync(Guid id)
        {
            return _userAppService.DeleteAsync(id);
        }

        [HttpGet]
        [Route("{id}/roles")]
        [SwaggerOperation(summary: "获取用户角色信息", Tags = new[] { "Users" })]
        public Task<ListResultDto<IdentityRoleDto>> GetRoleByUserId(Guid id)
        {
            return _userAppService.GetRoleByUserId(id);
        }

        [HttpGet]
        [Route("{id}/organization-units")]
        [SwaggerOperation(summary: "查询指定用户的组织信息 & 组织角色", Tags = new[] { "Users" })]
        public virtual Task<List<OrganizationUnitDto>> GetOrganizationUnitsAsync(Guid id)
        {
            return _userAppService.GetOrganizationUnitsAsync(id);
        }

        [HttpPut]
        [Route("{id}/lock")]
        [SwaggerOperation(summary: "锁定用户", Tags = new[] { "Users" })]
        public Task LockAsync(Guid id, LockUserInput input)
        {
            return _userAppService.LockAsync(id, input);
        }
    }
}