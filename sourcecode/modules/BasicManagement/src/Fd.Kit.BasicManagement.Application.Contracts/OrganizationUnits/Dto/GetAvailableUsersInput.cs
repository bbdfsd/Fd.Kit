using Volo.Abp.Application.Dtos;

namespace Fd.Kit.BasicManagement.OrganizationUnits.Dto;

public class GetAvailableUsersInput : PagedResultRequestDto
{
    public string Filter { get; set; }
}