using Fd.Kit.BasicManagement.Users;
using Fd.Kit.BasicManagement.Users.Dtos;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Threading.Tasks;
using Volo.Abp;

namespace Fd.Kit.BasicManagement.Systems
{
    [Area(BasicManagementRemoteServiceConsts.ModuleName)]
    [RemoteService(Name = BasicManagementRemoteServiceConsts.RemoteServiceName)]
    [Route("api/basic-management/account")]
    public class AccountController : BasicManagementController, IAccountAppService
    {
        private readonly IAccountAppService _accountAppService;

        public AccountController(IAccountAppService accountAppService)
        {
            _accountAppService = accountAppService;
        }

        [HttpPost]
        [Route("login")]
        [SwaggerOperation(summary: "登录", Tags = new[] { "Account" })]
        public Task<LoginOutput> LoginAsync(LoginInput input)
        {
            return _accountAppService.LoginAsync(input);
        }


        [HttpPut]
        [Route("change-password")]
        [SwaggerOperation(summary: "修改当前用户密码", Tags = new[] { "Account" })]
        public Task<bool> ChangePasswordAsync(Volo.Abp.Account.ChangePasswordInput input)
        {
            return _accountAppService.ChangePasswordAsync(input);
        }
    }
}