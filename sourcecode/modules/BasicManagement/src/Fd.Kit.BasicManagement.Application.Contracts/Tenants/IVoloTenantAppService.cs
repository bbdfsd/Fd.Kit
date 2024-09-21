using Fd.Kit.BasicManagement.Tenants.Dtos;
using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.AspNetCore.Mvc.MultiTenancy;
using Volo.Abp.TenantManagement;

namespace Fd.Kit.BasicManagement.Tenants
{
    public interface IVoloTenantAppService : IApplicationService
    {
        Task<FindTenantResultDto> FindTenantByNameAsync(FindTenantByNameInput input);

        Task<PagedResultDto<TenantDto>> ListAsync(PagingTenantInput input);

        Task<TenantDto> CreateAsync(TenantCreateDto input);

        Task<TenantDto> UpdateAsync(Guid id, UpdateTenantInput input);

        Task DeleteAsync(Guid id);

        /// <summary>
        /// 分页获取租户连接字符串
        /// </summary>
        Task<string> GetConnectionStringsAsync(Guid id);

        /// <summary>
        /// 新增或者更新连接字符串
        /// </summary>
        Task UpdateConnectionStringsAsync(Guid id, SassTenantConnectionStringInputDto input);

        /// <summary>
        /// 删除连接字符串
        /// </summary>
        //Task DeleteConnectionStringAsync(Guid id, DeleteConnectionStringInput input);
    }
}