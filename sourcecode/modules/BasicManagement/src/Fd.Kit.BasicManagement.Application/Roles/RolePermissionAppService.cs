using Fd.Kit.BasicManagement.Roles;
using Fd.Kit.BasicManagement.Roles.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Identity;
using Volo.Abp.PermissionManagement;

namespace Fd.Kit.BasicManagement.Roles
{
    [Authorize]
    public class RolePermissionAppService : BasicManagementAppService, IRolePermissionAppService
    {
        private readonly IPermissionAppService _rolePermissionAppService;
        private readonly PermissionOptions _permissionOptions;

        public RolePermissionAppService(IPermissionAppService rolePermissionAppService, IOptions<PermissionOptions> permissionOptions)
        {
            _rolePermissionAppService = rolePermissionAppService;
            _permissionOptions = permissionOptions.Value;
        }

        /// <summary>
        /// 获取所有权限
        /// </summary>
        public virtual async Task<GetPermissionListResultDto> GetPermissionAsync([FromQuery] string providerName, [FromQuery] string providerKey)
        {
            return await _rolePermissionAppService.GetAsync(providerName, providerKey);
            //return BuildTreeData(permissions.Groups);
        }

        /// <summary>
        /// 更新权限
        /// </summary>
        [Authorize(IdentityPermissions.Roles.ManagePermissions)]
        public virtual async Task UpdatePermissionAsync([FromQuery] string providerName, [FromQuery] string providerKey, UpdatePermissionsDto input)
        {
            await _rolePermissionAppService.UpdateAsync(providerName, providerKey, input);
        }

        ///// <summary>
        ///// 生成权限树
        ///// </summary>
        //private PermissionOutput BuildTreeData(List<PermissionGroupDto> input)
        //{
        //    var result = new PermissionOutput();


        //    var permissions = new List<PermissionTreeDto>();

        //    foreach (var group in input)
        //    {
        //        if (_permissionOptions.IsExclude(group.Name)) continue;

        //        // 获取分组信息
        //        var groupPermission = new PermissionTreeDto
        //        {
        //            Key = group.Name,
        //            Title = group.Name == "AbpIdentity"
        //                ? L[$"Permission:SystemManagement"]
        //                : group.DisplayName
        //        };
        //        if (group.Permissions.Any(p => p.IsGranted == true && p.Name.StartsWith(group.Name)))
        //        {
        //            result.Grants.Add(group.Name);
        //        }
        //        // 获取所有已授权和未授权权限集合
        //        foreach (var item in group.Permissions)
        //        {
        //            if (_permissionOptions.IsExclude(item.Name)) continue;

        //            result.AllGrants.Add(item.Name);
        //            if (item.IsGranted)
        //            {
        //                result.Grants.Add(item.Name);
        //            }
        //            //else
        //            //{
        //            //    // 只要没有授权的，就移除顶级的分组
        //            //    result.Grants.Remove(group.Name);
        //            //    result.Grants.Remove(item.ParentName);
        //            //}
        //        }

        //        // 递归菜单
        //        var childTreeMenu = RecursionMenu(group.Permissions, null);

        //        groupPermission.Children.AddRange(childTreeMenu.Children);

        //        permissions.Add(groupPermission);
        //    }


        //    result.Permissions = permissions;
        //    return result;
        //}


        ///// <summary>
        ///// 递归菜单
        ///// </summary>
        //private PermissionTreeDto RecursionMenu(List<PermissionGrantInfoDto> permissionGrantInfoDtos, string parentName)
        //{
        //    var tree = new PermissionTreeDto();
        //    var permissions = permissionGrantInfoDtos.Where(e => e.ParentName == parentName && !_permissionOptions.IsExclude(e.Name)).ToList();
        //    foreach (var item in permissions)
        //    {
        //        var child = new PermissionTreeDto
        //        {
        //            Key = item.Name,
        //            Title = item.DisplayName
        //        };
        //        child.Children.AddRange(RecursionMenu(permissionGrantInfoDtos, item.Name).Children);
        //        tree.Children.Add(child);
        //    }

        //    return tree;
        //}
    }
}