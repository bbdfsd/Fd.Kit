using Fd.Kit.BasicManagement.FdCores;
using Fd.Kit.BasicManagement.Roles.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Identity;

namespace Fd.Kit.BasicManagement.Roles
{
    public interface IRoleAppService : IApplicationService
    {
        Task<ListResultDto<IdentityRoleDto>> AllListAsync();

        Task<PagedResultDto<IdentityRoleDto>> ListAsync(PagingRoleListInput input);

        Task<IdentityRoleDto> CreateAsync(IdentityRoleCreateDto input);

        Task<IdentityRoleDto> UpdateAsync(UpdateRoleInput input);

        Task DeleteAsync(IdInput input);
    }
}