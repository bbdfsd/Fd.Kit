using Fd.Kit.BasicManagement.Users.Dtos;
using Volo.Abp.Application.Services;

namespace Fd.Kit.BasicManagement.Users
{
    public interface IAccountAppService : IApplicationService
    {
        /// <summary>
        /// 用户名密码登录
        /// </summary>
        Task<LoginOutput> LoginAsync(LoginInput input);
    }
}
