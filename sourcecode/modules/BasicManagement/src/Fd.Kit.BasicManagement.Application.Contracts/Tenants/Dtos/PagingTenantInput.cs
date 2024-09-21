using Volo.Abp.Application.Dtos;

namespace Fd.Kit.BasicManagement.Tenants.Dtos
{
    public class PagingTenantInput : PagedResultRequestDto
    {
        public string Filter { get; set; }
    }
}