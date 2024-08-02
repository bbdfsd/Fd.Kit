using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace Fd.Kit.Data;

/* This is used if database provider does't define
 * IKitDbSchemaMigrator implementation.
 */
public class NullKitDbSchemaMigrator : IKitDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
