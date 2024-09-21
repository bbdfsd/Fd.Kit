using Fd.Kit.BasicManagement.OrganizationUnits;
using Fd.Kit.BasicManagement.OrganizationUnits.Dto;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;

namespace Fd.Kit.BasicManagement.Systems;

[Area(BasicManagementRemoteServiceConsts.ModuleName)]
[RemoteService(Name = BasicManagementRemoteServiceConsts.RemoteServiceName)]
[Route("api/identity/organization-units")]
public class OrganizationUnitController : BasicManagementController, IOrganizationUnitAppService
{
    private readonly IOrganizationUnitAppService _organizationUnitAppService;

    public OrganizationUnitController(IOrganizationUnitAppService organizationUnitAppService)
    {
        _organizationUnitAppService = organizationUnitAppService;
    }

    [HttpGet]
    [Route("all")]
    [SwaggerOperation(summary: "获取组织机构树", Tags = new[] { "OrganizationUnits" })]
    public Task<List<OrganizationUnitDto>> GetTreeAsync()
    {
        return _organizationUnitAppService.GetTreeAsync();
    }

    [HttpGet]
    [Route("{id}")]
    [SwaggerOperation(summary: "获取特定组织机构", Tags = new[] { "OrganizationUnits" })]
    public Task<OrganizationUnitDto> GetAsync(Guid id)
    {
        return _organizationUnitAppService.GetAsync(id);
    }

    [HttpPost]
    [SwaggerOperation(summary: "创建组织机构", Tags = new[] { "OrganizationUnits" })]
    public Task CreateAsync(CreateOrganizationUnitInput input)
    {
        return _organizationUnitAppService.CreateAsync(input);
    }

    [HttpDelete]
    [Route("{id}")]
    [SwaggerOperation(summary: "删除组织机构", Tags = new[] { "OrganizationUnits" })]
    public Task DeleteAsync(Guid id)
    {
        return _organizationUnitAppService.DeleteAsync(id);
    }

    [HttpPut]
    [Route("{id}")]
    [SwaggerOperation(summary: "编辑组织机构", Tags = new[] { "OrganizationUnits" })]
    public Task UpdateAsync(Guid id, UpdateOrganizationUnitInput input)
    {
        return _organizationUnitAppService.UpdateAsync(id, input);
    }

    [HttpPut]
    [Route("{id}/roles")]
    [SwaggerOperation(summary: "向组织机构添加角色", Tags = new[] { "OrganizationUnits" })]
    public Task AddRoleToOrganizationUnitAsync(Guid id, AddRoleToOrganizationUnitInput input)
    {
        return _organizationUnitAppService.AddRoleToOrganizationUnitAsync(id, input);
    }


    [HttpDelete]
    [Route("{id}/roles/{roleId}")]
    [SwaggerOperation(summary: "向组织机构删除角色", Tags = new[] { "OrganizationUnits" })]
    public Task RemoveRoleFromOrganizationUnitAsync(Guid id, Guid roleId)
    {
        return _organizationUnitAppService.RemoveRoleFromOrganizationUnitAsync(id, roleId);
    }


    [HttpPut]
    [Route("{id}/members")]
    [SwaggerOperation(summary: "向组织机构添加用户", Tags = new[] { "OrganizationUnits" })]
    public Task AddUserToOrganizationUnitAsync(Guid id, AddUserToOrganizationUnitInput input)
    {
        return _organizationUnitAppService.AddUserToOrganizationUnitAsync(id, input);
    }

    [HttpDelete]
    [Route("{id}/members/{userId}")]
    [SwaggerOperation(summary: "向组织机构删除用户", Tags = new[] { "OrganizationUnits" })]
    public Task RemoveUserFromOrganizationUnitAsync(Guid id, Guid userId)
    {
        return _organizationUnitAppService.RemoveUserFromOrganizationUnitAsync(id, userId);
    }

    [HttpGet]
    [Route("{id}/members")]
    [SwaggerOperation(summary: "分页获取组织机构下用户", Tags = new[] { "OrganizationUnits" })]
    public Task<PagedResultDto<GetOrganizationUnitUserOutput>> GetMembersAsync(Guid id, GetOrganizationUnitUserInput input)
    {
        return _organizationUnitAppService.GetMembersAsync(id, input);
    }

    [HttpGet]
    [Route("{id}/roles")]
    [SwaggerOperation(summary: "分页获取组织机构下角色", Tags = new[] { "OrganizationUnits" })]
    public Task<PagedResultDto<GetOrganizationUnitRoleOutput>> GetRolesAsync(Guid id, GetOrganizationUnitRoleInput input)
    {
        return _organizationUnitAppService.GetRolesAsync(id, input);
    }


    [HttpGet]
    [Route("{id}/available-users")]
    [SwaggerOperation(summary: "获取不在组织机构的用户", Tags = new[] { "OrganizationUnits" })]
    public Task<PagedResultDto<GetUnAddUserOutput>> GetAvailableUsersAsync(Guid id, GetAvailableUsersInput input)
    {
        return _organizationUnitAppService.GetAvailableUsersAsync(id, input);
    }

    [HttpGet]
    [Route("{id}/available-roles")]
    [SwaggerOperation(summary: "获取不在组织机构的角色", Tags = new[] { "OrganizationUnits" })]
    public Task<PagedResultDto<GetUnAddRoleOutput>> GetAvailableRolesAsync(Guid id, GetAvailableRolesInput input)
    {
        return _organizationUnitAppService.GetAvailableRolesAsync(id, input);
    }

}