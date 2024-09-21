using Fd.Kit.BasicManagement.Features;
using Fd.Kit.BasicManagement.Features.Dtos;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.FeatureManagement;

namespace Fd.Kit.BasicManagement.Features;

[Authorize]
public class VoloFeatureAppService : BasicManagementAppService, IVoloFeatureAppService
{
    private readonly IFeatureAppService _featureAppService;

    public VoloFeatureAppService(IFeatureAppService featureAppService)
    {
        _featureAppService = featureAppService;
    }

    public virtual async Task<GetFeatureListResultDto> GetAsync(GetFeatureListResultInput input)
    {
        var result = await _featureAppService.GetAsync(input.ProviderName, input.ProviderKey);
        // 过滤自带的SettingManagement设置
        result.Groups = result.Groups.Where(e => e.Name != "SettingManagement").ToList();
        return result;
    }

    public virtual async Task UpdateAsync(UpdateFeatureInput input)
    {
        await _featureAppService.UpdateAsync(input.ProviderName, input.ProviderKey, input.UpdateFeaturesDto);
    }

    public virtual async Task DeleteAsync(DeleteFeatureInput input)
    {
        await _featureAppService.DeleteAsync(input.ProviderName, input.ProviderKey);
    }
}