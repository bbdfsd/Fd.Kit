using System;

namespace Fd.Kit.BasicManagement.OrganizationUnits.Dto;

public class GetUnAddRoleOutput
{
    public Guid Id { get; set; }

    public string Name { get; set; }
    public bool IsDefault { get; set; }
    public bool IsStatic { get; set; }
    public bool IsPublic { get; set; }
}