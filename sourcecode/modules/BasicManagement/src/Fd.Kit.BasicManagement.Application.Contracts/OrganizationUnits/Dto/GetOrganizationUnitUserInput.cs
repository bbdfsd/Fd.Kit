using Volo.Abp.Application.Dtos;

namespace Fd.Kit.BasicManagement.OrganizationUnits.Dto;

public class GetOrganizationUnitUserInput : PagedResultRequestDto
{
    public Guid OrganizationUnitId { get; set; }

    public string Filter { get; set; }
}