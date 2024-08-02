using System.Threading.Tasks;

namespace Fd.Kit.Data;

public interface IKitDbSchemaMigrator
{
    Task MigrateAsync();
}
