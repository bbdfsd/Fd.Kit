namespace Fd.Kit.BasicManagement.AuditLogs
{

    public class EntityChangeWithUsernameDto
    {
        public EntityChangeDto EntityChange { get; set; }

        public string UserName { get; set; }
    }
}