using Volo.Abp.Modularity;

namespace Fd.Kit;

[DependsOn(
    typeof(KitApplicationModule),
    typeof(KitDomainTestModule)
)]
public class KitApplicationTestModule : AbpModule
{

}
