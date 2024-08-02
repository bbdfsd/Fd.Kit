using Volo.Abp.Modularity;

namespace Fd.Kit;

/* Inherit from this class for your domain layer tests. */
public abstract class KitDomainTestBase<TStartupModule> : KitTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
