using Fd.Kit.BasicManagement.Localization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.TenantManagement;

namespace Fd.Kit.BasicManagement.Tenants.Dtos
{
    public class UpdateTenantInput : TenantUpdateDto, IValidatableObject
    {
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
        }
    }
}