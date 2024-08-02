namespace Fd.Kit.FileManagement.Data;

public interface IFileManagementDbSchemaMigrator
{
    Task MigrateAsync();
}