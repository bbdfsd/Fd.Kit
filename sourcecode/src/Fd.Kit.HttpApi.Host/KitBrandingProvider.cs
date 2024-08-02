using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace Fd.Kit;

[Dependency(ReplaceServices = true)]
public class KitBrandingProvider : DefaultBrandingProvider
{
    public override string AppName => "Kit";
}
