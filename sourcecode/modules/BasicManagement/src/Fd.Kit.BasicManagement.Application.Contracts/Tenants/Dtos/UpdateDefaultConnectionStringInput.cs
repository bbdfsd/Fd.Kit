using Fd.Kit.BasicManagement.Localization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Fd.Kit.BasicManagement.Tenants.Dtos
{
    public class UpdateConnectionStringInput : IValidatableObject
    {
        public Guid Id { get; set; }
        public string ConnectionString { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var localization = validationContext.GetRequiredService<IStringLocalizer<BasicManagementResource>>();
            if (ConnectionString.IsNullOrWhiteSpace())
            {
                yield return new ValidationResult(
                    localization[BasicManagementErrorCodes.NotEmpty, nameof(ConnectionString)],
                    new[] { nameof(ConnectionString) }
                );
            }
        }
    }
}