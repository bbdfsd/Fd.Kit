using System;

namespace Fd.Kit.BasicManagement.OrganizationUnits.Dto;

public class GetUnAddUserOutput
{
    public Guid Id { get; set; }

    public string UserName { get; set; }
    public string Name { get; set; }

    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public bool IsActive { get; set; }
}