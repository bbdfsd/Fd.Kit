using Volo.Abp.Modularity;

namespace Fd.Kit;

[DependsOn(
    typeof(KitDomainModule),
    typeof(KitTestBaseModule)
)]
public class KitDomainTestModule : AbpModule
{

}
