using Fd.Kit.BasicManagement.Settings;
using Fd.Kit.BasicManagement.Settings.Dtos;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Fd.Kit.BasicManagement.Systems
{
    [Route("Settings")]
    public class SettingController : BasicManagementController, ISettingAppService
    {
        private readonly ISettingAppService _settingAppService;

        public SettingController(ISettingAppService settingAppService)
        {
            _settingAppService = settingAppService;
        }

        [HttpPost("all")]
        [SwaggerOperation(summary: "获取所有Setting", Tags = new[] { "Settings" })]
        public async Task<List<SettingOutput>> GetAsync()
        {
            return await _settingAppService.GetAsync();
        }

        [HttpPost("update")]
        [SwaggerOperation(summary: "更新Setting", Tags = new[] { "Settings" })]
        public async Task UpdateAsync(UpdateSettingInput input)
        {
            await _settingAppService.UpdateAsync(input);
        }
    }
}