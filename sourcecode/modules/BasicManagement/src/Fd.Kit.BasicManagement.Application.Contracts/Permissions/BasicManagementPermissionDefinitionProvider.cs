using Fd.Kit.BasicManagement.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Identity;
using Volo.Abp.Localization;
using Volo.Abp.MultiTenancy;

namespace Fd.Kit.BasicManagement.Permissions;

public class BasicManagementPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var abpIdentityGroup = context.GetGroup(IdentityPermissions.GroupName);
        var userManagement = abpIdentityGroup.GetPermissionOrNull(IdentityPermissions.Users.Default);
        userManagement.AddChild(BasicManagementPermissions.SystemManagement.UserEnable, L("Permission:Enable"), multiTenancySide: MultiTenancySides.Both);
        userManagement.AddChild(BasicManagementPermissions.SystemManagement.UserExport, L("Permission:Export"), multiTenancySide: MultiTenancySides.Both);

        abpIdentityGroup.AddPermission(BasicManagementPermissions.SystemManagement.AuditLog, L("Permission:AuditLogManagement"), multiTenancySide: MultiTenancySides.Both);
        abpIdentityGroup.AddPermission(BasicManagementPermissions.SystemManagement.Setting, L("Permission:SettingManagement"), multiTenancySide: MultiTenancySides.Both);
        abpIdentityGroup.AddPermission(BasicManagementPermissions.SystemManagement.IdentitySecurityLog, L("Permission:IdentitySecurityLog"), multiTenancySide: MultiTenancySides.Both);
        abpIdentityGroup.AddPermission(BasicManagementPermissions.SystemManagement.FeatureManagement, L("Permission:FeatureManagement"), multiTenancySide: MultiTenancySides.Both);

        var organizationUnitManagement = abpIdentityGroup
            .AddPermission(BasicManagementPermissions.SystemManagement.OrganizationUnit, L("Permission:OrganizationUnitManagement"), multiTenancySide: MultiTenancySides.Both);

        organizationUnitManagement.AddChild(
            BasicManagementPermissions.SystemManagement.OrganizationUnits.ManageOU, L("Permission:Create"), multiTenancySide: MultiTenancySides.Both
        );
        organizationUnitManagement.AddChild(
            BasicManagementPermissions.SystemManagement.OrganizationUnits.ManageMembers, L("Permission:Update"), multiTenancySide: MultiTenancySides.Both
        );
        organizationUnitManagement.AddChild(
            BasicManagementPermissions.SystemManagement.OrganizationUnits.ManageRoles, L("Permission:Delete"), multiTenancySide: MultiTenancySides.Both
        );
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<BasicManagementResource>(name);
    }
}