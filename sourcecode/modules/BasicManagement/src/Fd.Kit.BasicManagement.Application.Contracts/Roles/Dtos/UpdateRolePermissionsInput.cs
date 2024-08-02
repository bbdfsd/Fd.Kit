using Fd.Kit.BasicManagement.Localization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.PermissionManagement;

namespace Fd.Kit.BasicManagement.Roles.Dtos
{
    public class UpdateRolePermissionsInput : IValidatableObject
    {
        public string ProviderName { get; set; }

        public string ProviderKey { get; set; }

        public UpdatePermissionsDto UpdatePermissionsDto { get; set; }

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

            if (ProviderKey.IsNullOrWhiteSpace())
            {
                yield return new ValidationResult(
                    localization[BasicManagementErrorCodes.NotEmpty, nameof(ProviderKey)],
                    new[] { nameof(ProviderKey) }
                );
            }
        }
    }
}