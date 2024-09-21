using Fd.Kit.BasicManagement.Tenants.Dtos;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.AspNetCore.Mvc.MultiTenancy;
using Volo.Abp.TenantManagement;

namespace Fd.Kit.BasicManagement.Tenants
{
    [Area(BasicManagementRemoteServiceConsts.ModuleName)]
    [RemoteService(Name = BasicManagementRemoteServiceConsts.RemoteServiceName)]
    [Route("api/saas/tenants")]
    public class TenantController : BasicManagementController, IVoloTenantAppService
    {
        private readonly IVoloTenantAppService _voloTenantAppService;

        public TenantController(IVoloTenantAppService voloTenantAppService)
        {
            _voloTenantAppService = voloTenantAppService;
        }

        [HttpGet]
        [Route("name")]
        [SwaggerOperation(summary: "通过名称获取租户信息", Tags = new[] { "Tenants" })]
        public Task<FindTenantResultDto> FindTenantByNameAsync(FindTenantByNameInput input)
        {
            return _voloTenantAppService.FindTenantByNameAsync(input);
        }

        [HttpGet]
        [SwaggerOperation(summary: "分页获取租户信息", Tags = new[] { "Tenants" })]
        public Task<PagedResultDto<TenantDto>> ListAsync(PagingTenantInput input)
        {
            return _voloTenantAppService.ListAsync(input);
        }

        [HttpPost]
        [SwaggerOperation(summary: "创建租户", Tags = new[] { "Tenants" })]
        public Task<TenantDto> CreateAsync(TenantCreateDto input)
        {
            return _voloTenantAppService.CreateAsync(input);
        }

        [HttpPut]
        [Route("{id}")]
        [SwaggerOperation(summary: "更新租户", Tags = new[] { "Tenants" })]
        public Task<TenantDto> UpdateAsync(Guid id, UpdateTenantInput input)
        {
            return _voloTenantAppService.UpdateAsync(id, input);
        }

        [HttpDelete]
        [Route("{id}")]
        [SwaggerOperation(summary: "删除租户", Tags = new[] { "Tenants" })]
        public Task DeleteAsync(Guid id)
        {
            return _voloTenantAppService.DeleteAsync(id);
        }

        [HttpGet]
        [Route("{id}/connection-strings")]
        [SwaggerOperation(summary: "获取指定租户的连接字符串", Tags = new[] { "Tenants" })]
        public Task<string> GetConnectionStringsAsync(Guid id)
        {
            return _voloTenantAppService.GetConnectionStringsAsync(id);
        }

        [HttpPut]
        [Route("{id}/connection-strings")]
        [SwaggerOperation(summary: "新增或者更新租户所有连接字符串", Tags = new[] { "Tenants" })]
        public Task UpdateConnectionStringsAsync(Guid id, SassTenantConnectionStringInputDto input)
        {
            return _voloTenantAppService.UpdateConnectionStringsAsync(id, input);
        }
    }
}