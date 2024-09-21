using System;
using System.Collections.Generic;

namespace Fd.Kit.BasicManagement.OrganizationUnits.Dto;

public class OrganizationUnitDto
{
    public Guid Id { get; set; }

    public Guid? TenantId { get; set; }

    public string Code { get; set; }

    public string DisplayName { get; set; }

    public Guid? ParentId { get; set; }
    public List<OrganizationUnitRoleDto> Roles { get; set; }
}