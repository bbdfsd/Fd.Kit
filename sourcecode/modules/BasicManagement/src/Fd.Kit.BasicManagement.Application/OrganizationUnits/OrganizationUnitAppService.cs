using Fd.Kit.BasicManagement.OrganizationUnits.Dto;
using Fd.Kit.BasicManagement.Permissions;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace Fd.Kit.BasicManagement.OrganizationUnits;

[Authorize(Policy = BasicManagementPermissions.SystemManagement.OrganizationUnits.Default)]
public class OrganizationUnitAppService : BasicManagementAppService, IOrganizationUnitAppService
{
    private readonly OrganizationUnitManager _organizationUnitManager;
    private readonly IdentityUserManager _identityUserManager;
    private readonly IOrganizationUnitRepository _organizationUnitRepository;

    public OrganizationUnitAppService(
        OrganizationUnitManager OrganizationUnitManager,
        IdentityUserManager identityUserManager,
        IOrganizationUnitRepository organizationUnitRepository)
    {
        _organizationUnitManager = OrganizationUnitManager;
        _identityUserManager = identityUserManager;
        _organizationUnitRepository = organizationUnitRepository;
    }

    public virtual async Task<List<OrganizationUnitDto>> GetTreeAsync()
    {
        var organizationUnits = await _organizationUnitRepository.GetListAsync();
        return ObjectMapper.Map<List<OrganizationUnit>, List<OrganizationUnitDto>>(organizationUnits);
    }


    public async Task<OrganizationUnitDto> GetAsync(Guid id)
    {
        var organizationUnit = await _organizationUnitRepository.GetAsync(id);
        return ObjectMapper.Map<OrganizationUnit, OrganizationUnitDto>(organizationUnit);
    }

    [Authorize(BasicManagementPermissions.SystemManagement.OrganizationUnits.ManageOU)]
    public virtual async Task CreateAsync(CreateOrganizationUnitInput input)
    {
        var entity = new OrganizationUnit
        (
            GuidGenerator.Create(),
            input.DisplayName,
            input.ParentId,
            CurrentTenant.Id
        );
        await _organizationUnitManager.CreateAsync(entity);
    }

    [Authorize(BasicManagementPermissions.SystemManagement.OrganizationUnits.ManageOU)]
    public virtual Task DeleteAsync(Guid id)
    {
        return _organizationUnitManager.DeleteAsync(id);
    }

    [Authorize(BasicManagementPermissions.SystemManagement.OrganizationUnits.ManageOU)]
    public virtual async Task UpdateAsync(Guid id, UpdateOrganizationUnitInput input)
    {
        var entity = await _organizationUnitRepository.FindAsync(id);
        if (entity != null)
        {
            entity.DisplayName = input.DisplayName;
            await _organizationUnitManager.UpdateAsync(entity);
        }
    }

    [Authorize(BasicManagementPermissions.SystemManagement.OrganizationUnits.ManageRoles)]
    public virtual async Task AddRoleToOrganizationUnitAsync(Guid id, AddRoleToOrganizationUnitInput input)
    {
        foreach (var roleId in input.RoleIds)
        {
            await _organizationUnitManager.AddRoleToOrganizationUnitAsync(roleId, id);
        }
    }

    [Authorize(BasicManagementPermissions.SystemManagement.OrganizationUnits.ManageRoles)]
    public virtual async Task RemoveRoleFromOrganizationUnitAsync(Guid id, Guid roleId)
    {
        await _organizationUnitManager.RemoveRoleFromOrganizationUnitAsync(roleId, id);
    }

    [Authorize(BasicManagementPermissions.SystemManagement.OrganizationUnits.ManageMembers)]
    public virtual async Task AddUserToOrganizationUnitAsync(Guid id, AddUserToOrganizationUnitInput input)
    {
        foreach (var userId in input.UserIds)
        {
            await _identityUserManager.AddToOrganizationUnitAsync(userId, id);
        }
    }

    [Authorize(BasicManagementPermissions.SystemManagement.OrganizationUnits.ManageMembers)]
    public virtual async Task RemoveUserFromOrganizationUnitAsync(Guid id, Guid userId)
    {
        await _identityUserManager.RemoveFromOrganizationUnitAsync(userId, id);
    }

    public virtual async Task<PagedResultDto<GetOrganizationUnitUserOutput>> GetMembersAsync(Guid id, GetOrganizationUnitUserInput input)
    {
        var listResult = new List<GetOrganizationUnitUserOutput>();
        var organizationUnit = await _organizationUnitRepository.FindAsync(id);
        if (organizationUnit == null) throw new BusinessException(BasicManagementErrorCodes.OrganizationUnitNotExist);

        var count = await _organizationUnitRepository.GetMembersCountAsync(organizationUnit, filter: input.Filter);
        if (count > 0)
        {
            var list = await _organizationUnitRepository.GetMembersAsync
            (
                organizationUnit,
                maxResultCount: input.MaxResultCount,
                skipCount: input.SkipCount,
                filter: input.Filter
            );
            listResult = ObjectMapper.Map<List<IdentityUser>, List<GetOrganizationUnitUserOutput>>(list);
        }

        return new PagedResultDto<GetOrganizationUnitUserOutput>(count, listResult);
    }

    public virtual async Task<PagedResultDto<GetUnAddUserOutput>> GetAvailableUsersAsync(Guid id, GetAvailableUsersInput input)
    {
        var listResult = new List<GetUnAddUserOutput>();
        var organizationUnit = await _organizationUnitRepository.FindAsync(id);
        if (organizationUnit == null) throw new BusinessException(BasicManagementErrorCodes.OrganizationUnitNotExist);
        var count = await _organizationUnitRepository.GetUnaddedUsersCountAsync(organizationUnit, input.Filter);
        if (count > 0)
        {
            var users = await _organizationUnitRepository.GetUnaddedUsersAsync
            (
                organizationUnit,
                maxResultCount: input.MaxResultCount,
                skipCount: input.SkipCount,
                filter: input.Filter
            );
            listResult = ObjectMapper.Map<List<IdentityUser>, List<GetUnAddUserOutput>>(users);
        }

        return new PagedResultDto<GetUnAddUserOutput>(count, listResult);
    }

    public virtual async Task<PagedResultDto<GetOrganizationUnitRoleOutput>> GetRolesAsync(Guid id, GetOrganizationUnitRoleInput input)
    {
        var listResult = new List<GetOrganizationUnitRoleOutput>();
        var organizationUnit = await _organizationUnitRepository.FindAsync(id);
        if (organizationUnit == null) throw new BusinessException(BasicManagementErrorCodes.OrganizationUnitNotExist);

        var count = await _organizationUnitRepository.GetRolesCountAsync(organizationUnit);
        if (count > 0)
        {
            var list = await _organizationUnitRepository.GetRolesAsync(organizationUnit, maxResultCount: input.MaxResultCount, skipCount: input.SkipCount);
            listResult = ObjectMapper.Map<List<IdentityRole>, List<GetOrganizationUnitRoleOutput>>(list);
        }

        return new PagedResultDto<GetOrganizationUnitRoleOutput>(count, listResult);
    }

    public virtual async Task<PagedResultDto<GetUnAddRoleOutput>> GetAvailableRolesAsync(Guid id, GetAvailableRolesInput input)
    {
        var listResult = new List<GetUnAddRoleOutput>();
        var organizationUnit = await _organizationUnitRepository.FindAsync(id);
        if (organizationUnit == null) throw new BusinessException(BasicManagementErrorCodes.OrganizationUnitNotExist);
        var count = await _organizationUnitRepository.GetUnaddedRolesCountAsync(organizationUnit, input.Filter);
        if (count > 0)
        {
            var roles = await _organizationUnitRepository.GetUnaddedRolesAsync
            (
                organizationUnit,
                maxResultCount: input.MaxResultCount,
                skipCount: input.SkipCount,
                filter: input.Filter
            );
            listResult = ObjectMapper.Map<List<IdentityRole>, List<GetUnAddRoleOutput>>(roles);
        }

        return new PagedResultDto<GetUnAddRoleOutput>(count, listResult);
    }

    #region 私有方法

    //private List<TreeOutput> ConvertToTree(
    //    List<OrganizationUnitDto> list,
    //    Guid? Id = null)
    //{
    //    var result = new List<TreeOutput>();
    //    var childList = Children(list, Id);
    //    foreach (var item in childList)
    //    {
    //        var tree = new TreeOutput
    //        {
    //            Key = item.Id,
    //            Title = item.DisplayName,
    //            Children = ConvertToTree(list, item.Id)
    //        };
    //        result.Add(tree);
    //    }

    //    return result;
    //}

    //private List<OrganizationUnitDto> Children(
    //    List<OrganizationUnitDto> list,
    //    Guid? Id)
    //{
    //    var childList = list.Where(x => x.ParentId == Id).ToList();
    //    return childList;
    //}


    #endregion
}