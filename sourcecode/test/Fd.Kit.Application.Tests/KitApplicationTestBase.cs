using Volo.Abp.Modularity;

namespace Fd.Kit;

public abstract class KitApplicationTestBase<TStartupModule> : KitTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
