using Fd.Kit.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace Fd.Kit.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(KitEntityFrameworkCoreModule),
    typeof(KitApplicationContractsModule)
)]
public class KitDbMigratorModule : AbpModule
{
}
