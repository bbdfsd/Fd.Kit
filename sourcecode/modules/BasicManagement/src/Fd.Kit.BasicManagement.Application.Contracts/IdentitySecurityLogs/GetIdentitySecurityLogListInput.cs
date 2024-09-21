using System;
using Volo.Abp.Application.Dtos;

namespace Fd.Kit.BasicManagement.IdentitySecurityLogs;

public class GetIdentitySecurityLogListInput : PagedAndSortedResultRequestDto
{
    /// <summary>
    /// 开始时间
    /// </summary>
    public DateTime? StartTime { get; set; }

    /// <summary>
    /// 结束时间
    /// </summary>
    public DateTime? EndTime { get; set; }

    public string Identity { get; set; }

    /// <summary>
    /// 请求地址
    /// </summary>
    public string RequestUrl { get; set; }

    /// <summary>
    /// 用户Id
    /// </summary>
    public Guid? UserId { get; set; }

    /// <summary>
    /// 用户名
    /// </summary>
    public string UserName { get; set; }

    /// <summary>
    /// 应用程序名称
    /// </summary>
    public string ApplicationName { get; set; }

    /// <summary>
    /// CorrelationId
    /// </summary>
    public string CorrelationId { get; set; }

    /// <summary>
    /// ClientId
    /// </summary>
    public string ClientId { get; set; }
}