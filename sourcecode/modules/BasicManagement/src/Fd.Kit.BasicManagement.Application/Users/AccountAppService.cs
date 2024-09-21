using Fd.Kit.BasicManagement.ConfigurationOptions;
using Fd.Kit.BasicManagement.Users.Dtos;
using IdentityModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Account;
using Volo.Abp.Authorization;
using Volo.Abp.Identity;
using Volo.Abp.Identity.AspNetCore;
using Volo.Abp.Security.Claims;
using Volo.Abp.Settings;
using Volo.Abp.Users;
using IdentityUser = Volo.Abp.Identity.IdentityUser;

namespace Fd.Kit.BasicManagement.Users
{
    [AllowAnonymous]
    public class AccountAppService : BasicManagementAppService, IAccountAppService
    {
        private readonly IdentityUserManager _userManager;
        private readonly JwtOptions _jwtOptions;
        //private readonly Microsoft.AspNetCore.Identity.SignInManager<IdentityUser> _signInManager;
        private readonly IdentitySecurityLogManager _identitySecurityLogManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly AbpSignInManager _signInManager;
        protected IOptions<IdentityOptions> IdentityOptions { get; }

        public AccountAppService(
            IdentityUserManager userManager,
            IOptionsSnapshot<JwtOptions> jwtOptions,
            IdentitySecurityLogManager identitySecurityLogManager,
            IHttpContextAccessor httpContextAccessor,
            AbpSignInManager signInManager,
            ISettingProvider settingProvider,
            IOptions<IdentityOptions> identityOptions)
        {
            _userManager = userManager;
            _jwtOptions = jwtOptions.Value;
            _identitySecurityLogManager = identitySecurityLogManager;
            _httpContextAccessor = httpContextAccessor;
            _signInManager = signInManager;
            IdentityOptions = identityOptions;
        }

        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        /// <exception cref="BusinessException"></exception>
        public virtual async Task<LoginOutput> LoginAsync(LoginInput input)
        {
            await IdentityOptions.SetAsync();

            var result = await _signInManager.PasswordSignInAsync(input.UserNameOrEmailAddress, input.Password, false, true);

            if (result.IsNotAllowed)
            {
                throw new BusinessException(BasicManagementErrorCodes.UserDisabled);
            }

            if (result.IsLockedOut)
            {
                throw new BusinessException(BasicManagementErrorCodes.UserLockedOut);
            }

            if (!result.Succeeded)
            {
                throw new BusinessException(BasicManagementErrorCodes.UserOrPasswordMismatch);
            }


            var user = await _userManager.FindByNameAsync(input.UserNameOrEmailAddress);

            await _identitySecurityLogManager.SaveAsync(new IdentitySecurityLogContext()
            {
                Action = _httpContextAccessor.HttpContext?.Request.Path,
                UserName = input.UserNameOrEmailAddress,
                Identity = "Bearer"
            });
            return await BuildResult(user);
        }

        /// <summary>
        /// 修改密码
        /// </summary>
        [Authorize]
        public virtual async Task<bool> ChangePasswordAsync(ChangePasswordInput input)
        {
            await IdentityOptions.SetAsync();
            var identityUser = await _userManager.GetByIdAsync(CurrentUser.GetId());
            IdentityResult result;
            if (identityUser.PasswordHash == null)
            {
                result = await _userManager.AddPasswordAsync(identityUser, input.NewPassword);
                result.CheckErrors();
            }
            else
            {
                result = await _userManager.ChangePasswordAsync(identityUser, input.CurrentPassword, input.NewPassword);
                result.CheckErrors();
            }

            return result.Succeeded;
        }

        #region 私有方法

        private async Task<LoginOutput> BuildResult(IdentityUser user)
        {
            if (!user.IsActive) throw new BusinessException(BasicManagementErrorCodes.UserLockedOut);
            var roles = await _userManager.GetRolesAsync(user);
            if (roles == null || roles.Count == 0) throw new AbpAuthorizationException();
            var token = GenerateJwt(user.Id, user.UserName, user.Name, user.Email,
                user.TenantId.ToString(), roles.ToList());
            var loginOutput = ObjectMapper.Map<IdentityUser, LoginOutput>(user);
            loginOutput.Token = token;
            loginOutput.Roles = roles.ToList();
            return loginOutput;
        }

        /// <summary>
        /// 生成jwt token
        /// </summary>
        /// <returns></returns>
        private string GenerateJwt(Guid userId, string userName, string name, string email, string tenantId, List<string> roles)
        {
            var dateNow = Clock.Now;
            var expirationTime = dateNow.AddHours(_jwtOptions.ExpirationTime);
            var key = Encoding.ASCII.GetBytes(_jwtOptions.SecurityKey);

            var claims = new List<Claim>
            {
                new Claim(JwtClaimTypes.Audience, _jwtOptions.Audience),
                new Claim(JwtClaimTypes.Issuer, _jwtOptions.Issuer),
                new Claim(AbpClaimTypes.UserId, userId.ToString()),
                new Claim(AbpClaimTypes.Name, name),
                new Claim(AbpClaimTypes.UserName, userName),
                new Claim(AbpClaimTypes.Email, email),
                new Claim(AbpClaimTypes.TenantId, tenantId)
            };

            foreach (var item in roles)
            {
                claims.Add(new Claim(AbpClaimTypes.Role, item));
            }

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = expirationTime, // token 过期时间
                NotBefore = dateNow, // token 签发时间
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var handler = new JwtSecurityTokenHandler();
            var token = handler.CreateToken(tokenDescriptor);
            return handler.WriteToken(token);
        }

        #endregion
    }
}