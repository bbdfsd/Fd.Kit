using Fd.Kit.BasicManagement.Features;
using Fd.Kit.BasicManagement.Features.Dtos;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using Volo.Abp.FeatureManagement;

namespace Fd.Kit.BasicManagement.Systems;

[Route("Features")]
public class FeatureController : BasicManagementController, IVoloFeatureAppService
{
    private readonly IVoloFeatureAppService _featureAppService;

    public FeatureController(IVoloFeatureAppService featureAppService)
    {
        _featureAppService = featureAppService;
    }

    [HttpPost("list")]
    [SwaggerOperation(summary: "获取Features", Tags = new[] { "Features" })]
    public Task<GetFeatureListResultDto> GetAsync(GetFeatureListResultInput input)
    {
        return _featureAppService.GetAsync(input);
    }

    [HttpPost("update")]
    [SwaggerOperation(summary: "更新Features", Tags = new[] { "Features" })]
    public Task UpdateAsync(UpdateFeatureInput input)
    {
        return _featureAppService.UpdateAsync(input);
    }

    [HttpPost("delete")]
    [SwaggerOperation(summary: "删除Features", Tags = new[] { "Features" })]
    public Task DeleteAsync(DeleteFeatureInput input)
    {
        return _featureAppService.DeleteAsync(input);
    }
}