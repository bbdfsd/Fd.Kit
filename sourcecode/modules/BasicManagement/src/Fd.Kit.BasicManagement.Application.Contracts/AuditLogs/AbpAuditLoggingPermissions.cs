using Volo.Abp.Reflection;

namespace Fd.Kit.BasicManagement.AuditLogs
{

    public class AbpAuditLoggingPermissions
    {
        public const string GroupName = "AuditLogging";

        public class AuditLogs
        {
            public const string Default = GroupName + ".AuditLogs";
        }

        public static string[] GetAll()
        {
            return ReflectionHelper.GetPublicConstantsRecursively(typeof(AbpAuditLoggingPermissions));
        }
    }

}