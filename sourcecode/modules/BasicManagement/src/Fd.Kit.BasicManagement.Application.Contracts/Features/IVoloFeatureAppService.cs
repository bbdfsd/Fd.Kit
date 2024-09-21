using Fd.Kit.BasicManagement.Features.Dtos;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.FeatureManagement;

namespace Fd.Kit.BasicManagement.Features;

public interface IVoloFeatureAppService : IApplicationService
{
    /// <summary>
    /// 获取Features
    /// </summary>
    Task<GetFeatureListResultDto> GetAsync(GetFeatureListResultInput input);

    /// <summary>
    /// 更新Features
    /// </summary>
    Task UpdateAsync(UpdateFeatureInput input);

    /// <summary>
    /// 删除Features
    /// </summary>
    Task DeleteAsync(DeleteFeatureInput input);
}