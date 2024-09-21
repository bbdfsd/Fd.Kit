using Volo.Abp.Application.Dtos;

namespace Fd.Kit.BasicManagement.OrganizationUnits.Dto;

public class GetAvailableRolesInput : PagedResultRequestDto
{
    public string Filter { get; set; }
}