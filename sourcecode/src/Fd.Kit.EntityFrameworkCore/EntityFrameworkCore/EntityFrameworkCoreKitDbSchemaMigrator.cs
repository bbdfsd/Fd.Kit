using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Fd.Kit.Data;
using Volo.Abp.DependencyInjection;

namespace Fd.Kit.EntityFrameworkCore;

public class EntityFrameworkCoreKitDbSchemaMigrator
    : IKitDbSchemaMigrator, ITransientDependency
{
    private readonly IServiceProvider _serviceProvider;

    public EntityFrameworkCoreKitDbSchemaMigrator(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task MigrateAsync()
    {
        /* We intentionally resolving the KitDbContext
         * from IServiceProvider (instead of directly injecting it)
         * to properly get the connection string of the current tenant in the
         * current scope.
         */

        await _serviceProvider
            .GetRequiredService<KitDbContext>()
            .Database
            .MigrateAsync();
    }
}
