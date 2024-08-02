using Fd.Kit.BasicManagement.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace Fd.Kit.BasicManagement;

public abstract class BasicManagementController : AbpControllerBase
{
    protected BasicManagementController()
    {
        LocalizationResource = typeof(BasicManagementResource);
    }
}
