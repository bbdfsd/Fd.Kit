using Fd.Kit.BasicManagement.Localization;
using Volo.Abp.Application.Services;

namespace Fd.Kit.BasicManagement;

public abstract class BasicManagementAppService : ApplicationService
{
    protected BasicManagementAppService()
    {
        LocalizationResource = typeof(BasicManagementResource);
        ObjectMapperContext = typeof(BasicManagementApplicationModule);
    }
}
