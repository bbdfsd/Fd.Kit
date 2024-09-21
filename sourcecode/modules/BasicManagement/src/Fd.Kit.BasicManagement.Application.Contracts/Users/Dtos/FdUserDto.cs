using System.Collections.Generic;
using Volo.Abp.Identity;

namespace Fd.Kit.BasicManagement.Users.Dtos
{
    public class FdUserDto:IdentityUserDto
    {
        public virtual string[] roleNames { set;get;}
    }
}
