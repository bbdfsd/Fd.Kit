using Fd.Kit.BasicManagement.Roles.Dtos;
using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Identity;

namespace Fd.Kit.BasicManagement.Roles
{
    public interface IRoleAppService : IApplicationService
    {
        Task<ListResultDto<IdentityRoleDto>> GetAllAsync();

        Task<PagedResultDto<IdentityRoleDto>> GetListAsync(PagingRoleListInput input);
        Task<IdentityRoleDto> GetAsync(Guid id);

        Task<IdentityRoleDto> CreateAsync(IdentityRoleCreateDto input);

        Task<IdentityRoleDto> UpdateAsync(Guid id, UpdateRoleInput input);

        Task DeleteAsync(Guid id);
    }
}