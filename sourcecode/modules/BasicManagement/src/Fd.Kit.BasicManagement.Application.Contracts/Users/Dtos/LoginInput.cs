using Fd.Kit.BasicManagement.Localization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Auditing;

namespace Fd.Kit.BasicManagement.Users.Dtos
{
    /// <summary>
    /// 登录
    /// </summary>
    public class LoginInput : IValidatableObject
    {
        /// <summary>
        /// 用户名或者邮箱
        /// </summary>
        public string Name { get; set; }


        /// <summary>
        /// 密码
        /// </summary>
        [DisableAuditing]
        public string Password { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var localization = validationContext.GetRequiredService<IStringLocalizer<BasicManagementResource>>();
            if (Name.IsNullOrWhiteSpace())
            {
                yield return new ValidationResult(
                    localization[BasicManagementErrorCodes.NotEmpty, nameof(Name)],
                    new[] { "Name" }
                );
            }

            if (Password.IsNullOrWhiteSpace())
            {
                yield return new ValidationResult(
                    localization[BasicManagementErrorCodes.NotEmpty, nameof(Password)],
                    new[] { "Password" }
                );
            }
        }
    }
}