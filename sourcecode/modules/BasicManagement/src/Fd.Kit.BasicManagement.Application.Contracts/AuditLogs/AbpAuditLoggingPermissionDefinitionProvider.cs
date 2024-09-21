using Volo.Abp.AuditLogging.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace Fd.Kit.BasicManagement.AuditLogs
{

    public class AbpAuditLoggingPermissionDefinitionProvider : PermissionDefinitionProvider
    {
        public override void Define(IPermissionDefinitionContext context)
        {
            var permissionGroup = context.AddGroup(AbpAuditLoggingPermissions.GroupName, L("Permission:AuditLogging"));

            permissionGroup.AddPermission(AbpAuditLoggingPermissions.AuditLogs.Default, L("Permission:AuditLogs"));
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<AuditLoggingResource>(name);
        }
    }
}