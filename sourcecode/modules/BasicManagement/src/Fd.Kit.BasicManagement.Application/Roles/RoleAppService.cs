using Fd.Kit.BasicManagement.Roles.Dtos;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;
using Volo.Abp.ObjectMapping;

namespace Fd.Kit.BasicManagement.Roles;

[Authorize(Policy = IdentityPermissions.Roles.Default)]
public class RoleAppService : BasicManagementAppService, IRoleAppService
{
    private readonly IIdentityRoleAppService _identityRoleAppService;

    private readonly IIdentityRoleRepository _roleRepository;

    public RoleAppService(
        IIdentityRoleAppService identityRoleAppService,
        IIdentityRoleRepository roleRepository)
    {
        _identityRoleAppService = identityRoleAppService;

        _roleRepository = roleRepository;
    }

    /// <summary>
    /// 获取所有角色
    /// </summary>

    public virtual async Task<ListResultDto<IdentityRoleDto>> GetAllAsync()
    {
        List<IdentityRole> source = await _roleRepository.GetListAsync().ConfigureAwait(continueOnCapturedContext: false);
        return new ListResultDto<IdentityRoleDto>(ObjectMapper.Map<List<IdentityRole>, List<IdentityRoleDto>>(source));
    }

    /// <summary>
    /// 分页查询角色
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    public virtual async Task<PagedResultDto<IdentityRoleDto>> GetListAsync(PagingRoleListInput input)
    {
        var request = new GetIdentityRolesInput
        {
            Filter = input.Filter?.Trim(),
            MaxResultCount = input.MaxResultCount,
            SkipCount = input.SkipCount
        };
        var items = await _roleRepository.GetListAsync(request.Sorting, request.MaxResultCount, request.SkipCount, request.Filter);
        var count = await _roleRepository.GetCountAsync(request.Filter);
        return new PagedResultDto<IdentityRoleDto>(count, ObjectMapper.Map<List<IdentityRole>, List<IdentityRoleDto>>(items));
    }

    /// <summary>
    /// 根据Id查询
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    /// <exception cref="NotImplementedException"></exception>
    public async Task<IdentityRoleDto> GetAsync(Guid id)
    {
        var result = await _roleRepository.GetAsync(id);
        return ObjectMapper.Map<IdentityRole, IdentityRoleDto>(result);
    }


    /// <summary>
    /// 创建角色
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    [Authorize(IdentityPermissions.Roles.Create)]
    public virtual async Task<IdentityRoleDto> CreateAsync(IdentityRoleCreateDto input)
    {
        return await _identityRoleAppService.CreateAsync(input);
    }

    /// <summary>
    /// 更新角色
    /// </summary>
    [Authorize(IdentityPermissions.Roles.Update)]
    public virtual async Task<IdentityRoleDto> UpdateAsync(Guid id, UpdateRoleInput input)
    {
        return await _identityRoleAppService.UpdateAsync(id, input);
    }


    /// <summary>
    /// 删除角色
    /// </summary>
    [Authorize(IdentityPermissions.Roles.Delete)]
    public virtual async Task DeleteAsync(Guid id)
    {
        await _identityRoleAppService.DeleteAsync(id);
    }

}