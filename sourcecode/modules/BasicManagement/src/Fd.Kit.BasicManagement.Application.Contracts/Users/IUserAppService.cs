using Fd.Kit.BasicManagement.OrganizationUnits.Dto;
using Fd.Kit.BasicManagement.Users.Dtos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Identity;

namespace Fd.Kit.BasicManagement.Users
{
    public interface IUserAppService : IApplicationService
    {
        /// <summary>
        /// 分页查询用户
        /// </summary>
        Task<PagedResultDto<FdUserDto>> GetListAsync(PagingUserListInput input);

        /// <summary>
        /// 分页查询用户
        /// </summary>
        Task<List<IdentityUserDto>> GetAllAsync(PagingUserListInput input);

        /// <summary>
        /// 查询单个用户
        /// </summary>
        Task<FdUserDto> GetAsync(Guid id);
        /// <summary>
        /// 查询指定用户的组织信息 & 组织角色
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<List<OrganizationUnitDto>> GetOrganizationUnitsAsync(Guid id);

        /// <summary>
        /// 用户导出列表
        /// </summary>
        Task<ActionResult> ExportAsync(PagingUserListInput input);

        /// <summary>
        /// 新增用户
        /// </summary>
        Task<IdentityUserDto> CreateAsync(IdentityUserCreateDto input);

        /// <summary>
        /// 更新用户
        /// </summary>
        Task<IdentityUserDto> UpdateAsync(Guid id, UpdateUserInput input);

        /// <summary>
        /// 删除用户
        /// </summary>
        Task DeleteAsync(Guid id);


        /// <summary>
        /// 获取用户角色信息
        /// </summary>
        Task<ListResultDto<IdentityRoleDto>> GetRoleByUserId(Guid id);

        /// <summary>
        /// 锁定用户
        /// </summary>
        Task LockAsync(Guid id, LockUserInput input);
    }
}