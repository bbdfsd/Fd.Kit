using System.Threading.Tasks;

namespace Fd.Kit.BasicManagement.Data
{
    public interface IAbpProDbSchemaMigrator
    {
        Task MigrateAsync();
    }
}
