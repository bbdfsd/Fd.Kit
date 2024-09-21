using Fd.Kit.BasicManagement.Localization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Fd.Kit.BasicManagement.Tenants.Dtos;

public class SassTenantConnectionStringInputDto : IValidatableObject
{
    /// <summary>
    /// 连接字符串名称
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    /// 连接字符串地址
    /// </summary>
    public string Value { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        var localization = validationContext.GetRequiredService<IStringLocalizer<BasicManagementResource>>();
        if (Name.IsNullOrWhiteSpace())
        {
            yield return new ValidationResult(
                localization[BasicManagementErrorCodes.NotEmpty, nameof(Name)],
                new[] { nameof(Name) }
            );
        }

        if (Value.IsNullOrWhiteSpace())
        {
            yield return new ValidationResult(
                localization[BasicManagementErrorCodes.NotEmpty, nameof(Value)],
                new[] { nameof(Value) }
            );
        }
    }
}