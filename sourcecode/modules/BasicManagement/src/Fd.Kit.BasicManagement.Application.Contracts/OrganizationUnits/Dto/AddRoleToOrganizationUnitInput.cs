using System;
using System.Collections.Generic;

namespace Fd.Kit.BasicManagement.OrganizationUnits.Dto;

public class AddRoleToOrganizationUnitInput
{
    public List<Guid> RoleIds { get; set; }
}