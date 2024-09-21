using Fd.Kit.BasicManagement.Localization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Fd.Kit.BasicManagement.OrganizationUnits.Dto;

public class UpdateOrganizationUnitInput : IValidatableObject
{
    public string DisplayName { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        var localization = validationContext.GetRequiredService<IStringLocalizer<BasicManagementResource>>();
        if (DisplayName.IsNullOrWhiteSpace())
        {
            yield return new ValidationResult(
                localization[BasicManagementErrorCodes.NotEmpty, nameof(DisplayName)],
                new[] { nameof(DisplayName) }
            );
        }
    }
}