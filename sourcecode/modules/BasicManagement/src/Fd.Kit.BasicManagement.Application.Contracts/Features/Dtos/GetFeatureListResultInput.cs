using Fd.Kit.BasicManagement.Localization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;
using System.ComponentModel.DataAnnotations;

namespace Fd.Kit.BasicManagement.Features.Dtos;

public class GetFeatureListResultInput : IValidatableObject
{
    public string ProviderName { get; set; }

    public string ProviderKey { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        var localization = validationContext.GetRequiredService<IStringLocalizer<BasicManagementResource>>();
        if (ProviderName.IsNullOrWhiteSpace())
        {
            yield return new ValidationResult(
                localization[BasicManagementErrorCodes.NotEmpty, nameof(ProviderName)],
                new[] { nameof(ProviderName) }
            );
        }
    }
}