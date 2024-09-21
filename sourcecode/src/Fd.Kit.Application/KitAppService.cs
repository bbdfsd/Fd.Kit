using Fd.Kit.Localization;
using Volo.Abp.Application.Services;

namespace Fd.Kit;

/* Inherit your application services from this class.
 */
public abstract class KitAppService : ApplicationService
{
    protected KitAppService()
    {
        LocalizationResource = typeof(KitResource);
    }
}
