using System;
using Volo.Abp.Application.Dtos;

namespace Fd.Kit.BasicManagement.OrganizationUnits.Dto
{
    public class OrganizationUnitRoleDto : CreationAuditedEntityDto
    {
        public Guid? TenantId { get; set; }
        public Guid OrganizationUnitId { get; set; }

        public Guid RoleId { get; set; }
    }

}
