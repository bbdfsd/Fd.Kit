using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Auditing;

namespace Fd.Kit.BasicManagement.AuditLogs
{

    public class GetEntityChangesDto : PagedAndSortedResultRequestDto
    {
        public Guid? AuditLogId { get; set; }

        public EntityChangeType? EntityChangeType { get; set; }

        public string EntityId { get; set; }

        public string EntityTypeFullName { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }
    }

}