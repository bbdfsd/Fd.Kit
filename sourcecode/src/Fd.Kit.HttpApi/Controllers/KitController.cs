using Fd.Kit.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace Fd.Kit.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class KitController : AbpControllerBase
{
    protected KitController()
    {
        LocalizationResource = typeof(KitResource);
    }
}
