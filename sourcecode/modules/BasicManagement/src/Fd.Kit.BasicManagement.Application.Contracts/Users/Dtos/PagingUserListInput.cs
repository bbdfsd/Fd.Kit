using Volo.Abp.Application.Dtos;

namespace Fd.Kit.BasicManagement.Users.Dtos
{
    public class PagingUserListInput : PagedResultRequestDto
    {
        /// <summary>
        /// 关键字
        /// </summary>
        public string Filter { get; set; }
    }
}