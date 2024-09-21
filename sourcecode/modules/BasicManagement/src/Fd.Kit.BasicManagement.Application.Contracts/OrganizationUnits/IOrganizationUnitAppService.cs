using Fd.Kit.BasicManagement.OrganizationUnits.Dto;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Fd.Kit.BasicManagement.OrganizationUnits;

public interface IOrganizationUnitAppService : IApplicationService
{
    /// <summary>
    /// 获取组织机构树结构
    /// </summary>
    /// <returns></returns>
    Task<List<OrganizationUnitDto>> GetTreeAsync();
    /// <summary>
    /// 查询特定组织机构
    /// </summary>
    Task<OrganizationUnitDto> GetAsync(Guid id);

    /// <summary>
    /// 创建组织机构
    /// </summary>
    Task CreateAsync(CreateOrganizationUnitInput input);

    /// <summary>
    /// 删除组织机构
    /// </summary>
    Task DeleteAsync(Guid id);

    /// <summary>
    /// 编辑组织机构
    /// </summary>
    Task UpdateAsync(Guid id, UpdateOrganizationUnitInput input);

    /// <summary>
    /// 向组织机构添加角色
    /// </summary>
    Task AddRoleToOrganizationUnitAsync(Guid id, AddRoleToOrganizationUnitInput input);

    /// <summary>
    /// 向组织机构删除角色
    /// </summary>
    Task RemoveRoleFromOrganizationUnitAsync(Guid id, Guid roleId);

    /// <summary>
    /// 向组织机构添加用户
    /// </summary>
    Task AddUserToOrganizationUnitAsync(Guid id, AddUserToOrganizationUnitInput input);

    /// <summary>
    /// 向组织机构删除用户
    /// </summary>
    Task RemoveUserFromOrganizationUnitAsync(Guid id, Guid userId);

    /// <summary>
    /// 分页获取组织机构下用户
    /// </summary>
    Task<PagedResultDto<GetOrganizationUnitUserOutput>> GetMembersAsync(Guid id, GetOrganizationUnitUserInput input);


    /// <summary>
    /// 分页获取组织机构下角色
    /// </summary>
    Task<PagedResultDto<GetOrganizationUnitRoleOutput>> GetRolesAsync(Guid id, GetOrganizationUnitRoleInput input);

    /// <summary>
    /// 获取不在组织机构的用户
    /// </summary>
    Task<PagedResultDto<GetUnAddUserOutput>> GetAvailableUsersAsync(Guid id, GetAvailableUsersInput input);

    /// <summary>
    /// 获取不在组织机构的角色
    /// </summary>
    Task<PagedResultDto<GetUnAddRoleOutput>> GetAvailableRolesAsync(Guid id, GetAvailableRolesInput input);
}