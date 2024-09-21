using System;
using System.Net;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Validation;

namespace Fd.Kit.BasicManagement.AuditLogs
{

    public class GetAuditLogListDto : PagedAndSortedResultRequestDto
    {
        public DateTime? StartTime { get; set; }

        public DateTime? EndTime { get; set; }

        [DynamicStringLength(typeof(AuditLogDtoCommonConsts), nameof(AuditLogDtoCommonConsts.UrlFilterMaxLength))]
        public string Url { get; set; }

        [DynamicStringLength(typeof(AuditLogDtoCommonConsts), nameof(AuditLogDtoCommonConsts.UserNameFilterMaxLength))]
        public string UserName { get; set; }

        public string ApplicationName { get; set; }

        public string ClientIpAddress { get; set; }

        public string CorrelationId { get; set; }

        [DynamicStringLength(typeof(AuditLogDtoCommonConsts), nameof(AuditLogDtoCommonConsts.HttpMethodFilterMaxLength))]
        public string HttpMethod { get; set; }

        public HttpStatusCode? HttpStatusCode { get; set; }

        public int? MaxExecutionDuration { get; set; }

        public int? MinExecutionDuration { get; set; }

        public bool? HasException { get; set; }
    }
}