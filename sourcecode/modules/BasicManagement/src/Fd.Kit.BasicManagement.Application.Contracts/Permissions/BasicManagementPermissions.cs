using Volo.Abp.Reflection;

namespace Fd.Kit.BasicManagement.Permissions;

public class BasicManagementPermissions
{
    /// <summary>
    /// 系统管理扩展权限
    /// </summary>
    public static class SystemManagement
    {
        public const string Default = "AbpIdentity";
        public const string UserEnable = Default + ".Users.Enable";
        public const string UserExport = Default + ".Users.Export";
        public const string AuditLog = Default + ".AuditLog";
        public const string Setting = Default + ".Setting";
        public const string IdentitySecurityLog = Default + ".IdentitySecurityLogs";
        public const string OrganizationUnit = Default + ".OrganizationUnits";
        public const string FeatureManagement = Default + ".FeatureManagement";
        public static class OrganizationUnits
        {
            public const string Default = SystemManagement.Default + ".OrganizationUnits";
            public const string ManageOU = Default + ".ManageOU";
            public const string ManageMembers = Default + ".ManageMembers";
            public const string ManageRoles = Default + ".ManageRoles";
        }
    }

    public static string[] GetAll()
    {
        return ReflectionHelper.GetPublicConstantsRecursively(typeof(BasicManagementPermissions));
    }
}
