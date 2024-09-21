using Volo.Abp.Application.Dtos;

namespace Fd.Kit.BasicManagement.Roles.Dtos
{
    public class PagingRoleListInput : PagedResultRequestDto
    {
        public string Filter { get; set; }
    }
}