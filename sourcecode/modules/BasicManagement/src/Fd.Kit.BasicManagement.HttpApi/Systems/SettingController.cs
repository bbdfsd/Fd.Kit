using Fd.Kit.BasicManagement.Settings;
using Fd.Kit.BasicManagement.Settings.Dtos;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp;

namespace Fd.Kit.BasicManagement.Systems
{
    [Area(BasicManagementRemoteServiceConsts.ModuleName)]
    [RemoteService(Name = BasicManagementRemoteServiceConsts.RemoteServiceName)]
    [Route("api/basic-management/settings")]
    public class SettingController : BasicManagementController, ISettingAppService
    {
        private readonly ISettingAppService _settingAppService;

        public SettingController(ISettingAppService settingAppService)
        {
            _settingAppService = settingAppService;
        }

        [HttpGet]
        [SwaggerOperation(summary: "获取所有Setting", Tags = new[] { "Settings" })]
        public async Task<List<SettingOutput>> GetAsync()
        {
            return await _settingAppService.GetAsync();
        }

        [HttpPost]
        [SwaggerOperation(summary: "更新Setting", Tags = new[] { "Settings" })]
        public async Task UpdateAsync(UpdateSettingInput input)
        {
            await _settingAppService.UpdateAsync(input);
        }
    }
}