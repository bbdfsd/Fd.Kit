﻿using Volo.Abp.Application.Dtos;

namespace Fd.Kit.BasicManagement.OrganizationUnits.Dto;

public class GetOrganizationUnitRoleInput : PagedResultRequestDto
{
    public Guid OrganizationUnitId { get; set; }

}