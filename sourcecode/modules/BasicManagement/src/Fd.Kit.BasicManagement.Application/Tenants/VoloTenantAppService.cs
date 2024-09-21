using Fd.Kit.BasicManagement.Tenants.Dtos;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.AspNetCore.Mvc.MultiTenancy;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.FeatureManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;

namespace Fd.Kit.BasicManagement.Tenants
{
    [Authorize(TenantManagementPermissions.Tenants.Default)]
    public class VoloTenantAppService : BasicManagementAppService, IVoloTenantAppService
    {
        private readonly IAbpTenantAppService _abpTenantAppService;
        private readonly ITenantAppService _tenantAppService;
        private readonly ITenantRepository _tenantRepository;

        public VoloTenantAppService(
            IAbpTenantAppService abpTenantAppService,
            ITenantAppService tenantAppService,
            ITenantRepository tenantRepository)
        {
            _abpTenantAppService = abpTenantAppService;
            _tenantAppService = tenantAppService;
            _tenantRepository = tenantRepository;
        }

        [AllowAnonymous]
        public virtual async Task<FindTenantResultDto> FindTenantByNameAsync(FindTenantByNameInput input)
        {
            return await _abpTenantAppService.FindTenantByNameAsync(input.Name);
        }


        public virtual Task<PagedResultDto<TenantDto>> ListAsync(PagingTenantInput input)
        {
            var request = new GetTenantsInput
            {
                Filter = input.Filter,
                SkipCount = input.SkipCount,
                MaxResultCount = input.MaxResultCount
            };
            return _tenantAppService.GetListAsync(request);
        }

        [Authorize(policy: TenantManagementPermissions.Tenants.Create)]
        public virtual Task<TenantDto> CreateAsync(TenantCreateDto input)
        {
            return _tenantAppService.CreateAsync(input);
        }

        [Authorize(policy: TenantManagementPermissions.Tenants.Update)]
        public virtual Task<TenantDto> UpdateAsync(Guid id, UpdateTenantInput input)
        {
            return _tenantAppService.UpdateAsync(id, input);
        }

        [Authorize(policy: TenantManagementPermissions.Tenants.Delete)]
        public virtual Task DeleteAsync(Guid id)
        {
            return _tenantAppService.DeleteAsync(id);
        }


        [Authorize(TenantManagementPermissions.Tenants.ManageConnectionStrings)]
        public async Task<string> GetConnectionStringsAsync(Guid id)
        {
            return await _tenantAppService.GetDefaultConnectionStringAsync(id);
        }

        [Authorize(TenantManagementPermissions.Tenants.ManageConnectionStrings)]
        public async Task UpdateConnectionStringsAsync(Guid id, SassTenantConnectionStringInputDto input)
        {

            // abp 租户，feature，background,setting 模块不支持单独配置数据库
            if (AbpTenantManagementDbProperties.ConnectionStringName.ToLower() == input.Name.ToLower() ||
                AbpBackgroundJobsDbProperties.ConnectionStringName.ToLower() == input.Name.ToLower() ||
                AbpFeatureManagementDbProperties.ConnectionStringName.ToLower() == input.Name.ToLower() ||
                AbpSettingManagementDbProperties.ConnectionStringName.ToLower() == input.Name.ToLower())
            {
                throw new BusinessException(BasicManagementErrorCodes.NotSupportSetConnectionString);
            }
            var tenant = await _tenantRepository.FindAsync(id, true);

            if (tenant == null)
            {
                throw new BusinessException(BasicManagementErrorCodes.TenantNotExist);
            }

            var connectionString = tenant.ConnectionStrings.FirstOrDefault(e => e.Value == input.Name);
            if (connectionString == null)
            {
                tenant.SetConnectionString(input.Name, input.Value);
            }
            else
            {
                if (connectionString.Value != input.Value)
                {
                    tenant.SetConnectionString(input.Name, input.Value);
                }
            }
        }

        //public async Task DeleteConnectionStringAsync(Guid id, DeleteConnectionStringInput input)
        //{

        //    var tenant = await _tenantRepository.FindAsync(id, true);

        //    if (tenant == null)
        //    {
        //        throw new BusinessException(BasicManagementErrorCodes.TenantNotExist);
        //    }

        //    var connectionString = tenant.ConnectionStrings.FirstOrDefault(e => e.Name == input.Name);
        //    if (connectionString != null)
        //    {
        //        tenant.RemoveConnectionString(input.Name);
        //    }
        //}
    }
}