using Fd.Kit.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;
using Volo.Abp.MultiTenancy;

namespace Fd.Kit.Permissions;

public class KitPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(KitPermissions.GroupName);

        //Define your own permissions here. Example:
        //myGroup.AddPermission(KitPermissions.MyPermission1, L("Permission:MyPermission1"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<KitResource>(name);
    }
}
