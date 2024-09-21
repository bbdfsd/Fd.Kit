using Fd.Kit.BasicManagement.Users.Dtos;
using System.Threading.Tasks;
using Volo.Abp.Account;
using Volo.Abp.Application.Services;

namespace Fd.Kit.BasicManagement.Users
{
    public interface IAccountAppService : IApplicationService
    {
        /// <summary>
        /// 用户名密码登录
        /// </summary>
        Task<LoginOutput> LoginAsync(LoginInput input);

        /// <summary>
        /// 修改当前用户密码
        /// </summary>
        Task<bool> ChangePasswordAsync(ChangePasswordInput input);
    }
}
