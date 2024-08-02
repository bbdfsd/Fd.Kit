using Volo.Abp.Identity;

namespace Fd.Kit.BasicManagement.Users.Dtos
{
    public class UpdateUserInput
    {
        public Guid UserId { get; set; }

        public IdentityUserUpdateDto UserInfo { get; set; }
    }
}
