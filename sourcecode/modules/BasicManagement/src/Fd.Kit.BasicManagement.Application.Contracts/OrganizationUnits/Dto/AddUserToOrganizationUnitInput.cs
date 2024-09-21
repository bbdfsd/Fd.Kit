using System;
using System.Collections.Generic;

namespace Fd.Kit.BasicManagement.OrganizationUnits.Dto;

public class AddUserToOrganizationUnitInput
{
    public List<Guid> UserIds { get; set; }
}