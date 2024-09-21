using System;

namespace Fd.Kit.BasicManagement.OrganizationUnits.Dto;

public class RemoveUserToOrganizationUnitInput
{
    public Guid UserId { get; set; }

    public Guid OrganizationUnitId { get; set; }
}