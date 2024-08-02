using Fd.Kit.BasicManagement.Users;
using Fd.Kit.BasicManagement.Users.Dtos;
using Swashbuckle.AspNetCore.Annotations;

namespace Fd.Kit.BasicManagement.Systems
{
    public class AccountController : BasicManagementController, IAccountAppService
    {
        private readonly IAccountAppService _accountAppService;

        public AccountController(IAccountAppService accountAppService)
        {
            _accountAppService = accountAppService;
        }


        [SwaggerOperation(summary: "登录", Tags = new[] { "Account" })]
        public Task<LoginOutput> LoginAsync(LoginInput input)
        {
            return _accountAppService.LoginAsync(input);
        }
    }
}