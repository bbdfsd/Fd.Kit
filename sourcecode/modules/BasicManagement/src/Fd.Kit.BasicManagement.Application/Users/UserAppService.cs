using Fd.Kit.BasicManagement.OrganizationUnits.Dto;
using Fd.Kit.BasicManagement.Permissions;
using Fd.Kit.BasicManagement.Users.Dtos;
using Magicodes.ExporterAndImporter.Excel;
using Magicodes.ExporterAndImporter.Excel.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Auditing;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Identity;
using IdentityRole = Volo.Abp.Identity.IdentityRole;

namespace Fd.Kit.BasicManagement.Users
{
    [Authorize(IdentityPermissions.Users.Default)]
    public class UserAppService : BasicManagementAppService, IUserAppService
    {
        private readonly IIdentityUserAppService _identityUserAppService;
        private readonly IdentityUserManager _userManager;
        private readonly IIdentityUserRepository _identityUserRepository;
        private readonly IIdentityRoleRepository _identityRoleRepository;
        private readonly IPermissionStore _permissionStore;
        private readonly IExcelExporter _excelExporter;
        private readonly IOptions<IdentityOptions> _options;

        public UserAppService(
            IIdentityUserAppService identityUserAppService,
            IdentityUserManager userManager,
            IIdentityUserRepository userRepository,
            IIdentityRoleRepository identityRoleRepository,
            IExcelExporter excelExporter,
            IOptions<IdentityOptions> options)
        {
            _identityUserAppService = identityUserAppService;
            _userManager = userManager;
            _identityUserRepository = userRepository;
            _identityRoleRepository = identityRoleRepository;
            _excelExporter = excelExporter;
            _options = options;
        }

        /// <summary>
        /// 分页查询用户
        /// </summary>
        public virtual async Task<PagedResultDto<FdUserDto>> GetListAsync(PagingUserListInput input)
        {
            var request = new GetIdentityUsersInput
            {
                Filter = input.Filter?.Trim(),
                MaxResultCount = input.MaxResultCount,
                SkipCount = input.SkipCount,
                Sorting = nameof(IHasModificationTime.LastModificationTime)
            };

            var count = await _identityUserRepository.GetCountAsync(request.Filter);
            var users = await _identityUserRepository.GetListAsync(request.Sorting, request.MaxResultCount, request.SkipCount, request.Filter);
            var userItems = ObjectMapper.Map<List<Volo.Abp.Identity.IdentityUser>, List<FdUserDto>>(users);
            if (userItems.Count > 0)
            {
                var userRoles = await _identityUserRepository.GetRoleNamesAsync(users.Select(item => item.Id));
                userItems = userItems.Select(item =>
                {
                    var matchUserRole = userRoles.FirstOrDefault(ur => ur.Id == item.Id);
                    item.roleNames = matchUserRole?.RoleNames ?? [];
                    return item;
                }).ToList();
            }

            return new PagedResultDto<FdUserDto>(count, userItems);
        }

        /// <summary>
        /// 查询指定条件的所有用户
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<List<IdentityUserDto>> GetAllAsync(PagingUserListInput input)
        {
            var request = new GetIdentityUsersInput
            {
                Filter = input.Filter?.Trim(),
                MaxResultCount = input.MaxResultCount,
                SkipCount = input.SkipCount,
                Sorting = nameof(IHasModificationTime.LastModificationTime)
            };

            var source = await _identityUserRepository
                .GetListAsync(request.Sorting, request.MaxResultCount, request.SkipCount, request.Filter);

            return ObjectMapper.Map<List<Volo.Abp.Identity.IdentityUser>, List<IdentityUserDto>>(source);

        }
        /// <summary>
        /// 查询指定用户的组织信息 & 组织角色
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public virtual async Task<List<OrganizationUnitDto>> GetOrganizationUnitsAsync(Guid id)
        {
            var organizationUnits = await _identityUserRepository.GetOrganizationUnitsAsync(id, includeDetails: true);
            return new List<OrganizationUnitDto>(
                ObjectMapper.Map<List<OrganizationUnit>, List<OrganizationUnitDto>>(organizationUnits)
            );
        }

        /// <summary>
        /// 根据Id查询用户信息
        /// </summary>
        public virtual async Task<FdUserDto> GetAsync(Guid id)
        {
            var user = await _identityUserRepository.GetAsync(id);
            var userDto = ObjectMapper.Map<Volo.Abp.Identity.IdentityUser, FdUserDto>(user);
            userDto.roleNames = (await _identityUserRepository.GetRoleNamesAsync(id)).ToArray();
            return userDto;
        }

        /// <summary>
        /// 用户导出列表
        /// </summary>
        [Authorize(BasicManagementPermissions.SystemManagement.UserExport)]
        public virtual async Task<ActionResult> ExportAsync(PagingUserListInput input)
        {
            var request = new GetIdentityUsersInput
            {
                Filter = input.Filter?.Trim(),
                MaxResultCount = input.MaxResultCount,
                SkipCount = input.SkipCount,
                Sorting = " LastModificationTime desc"
            };
            var source = await _identityUserRepository
                .GetListAsync(request.Sorting, request.MaxResultCount, request.SkipCount, request.Filter);
            var result = ObjectMapper.Map<List<Volo.Abp.Identity.IdentityUser>, List<ExportIdentityUserOutput>>(source);
            var bytes = await _excelExporter.ExportAsByteArray<ExportIdentityUserOutput>(result);
            return new XlsxFileResult(bytes: bytes, fileDownloadName: $"用户导出列表{Clock.Now:yyyyMMdd}");
        }

        /// <summary>
        /// 新增用户
        /// </summary>
        [Authorize(IdentityPermissions.Users.Create)]
        public virtual async Task<IdentityUserDto> CreateAsync(IdentityUserCreateDto input)
        {
            input.LockoutEnabled = true;
            return await _identityUserAppService.CreateAsync(input);
        }

        /// <summary>
        /// 更新用户
        /// </summary>
        [Authorize(IdentityPermissions.Users.Update)]
        public virtual async Task<IdentityUserDto> UpdateAsync(Guid id, UpdateUserInput input)
        {
            return await _identityUserAppService.UpdateAsync(id, input);
        }

        /// <summary>
        /// 删除用户
        /// </summary>
        [Authorize(IdentityPermissions.Users.Delete)]
        public virtual async Task DeleteAsync(Guid id)
        {
            await _identityUserAppService.DeleteAsync(id);
        }

        /// <summary>
        /// 获取用户角色信息
        /// </summary>
        public virtual async Task<ListResultDto<IdentityRoleDto>> GetRoleByUserId(Guid id)
        {
            var roles = await _identityUserRepository.GetRolesAsync(id);
            return new ListResultDto<IdentityRoleDto>(
                ObjectMapper.Map<List<IdentityRole>, List<IdentityRoleDto>>(roles)
            );
        }


        /// <summary>
        /// 锁定用户
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [Authorize(BasicManagementPermissions.SystemManagement.UserEnable)]
        public virtual async Task LockAsync(Guid id, LockUserInput input)
        {
            var identityUser = await _userManager.GetByIdAsync(id);
            identityUser.SetIsActive(!input.Locked);
            await _userManager.UpdateAsync(identityUser);
        }
    }
}
