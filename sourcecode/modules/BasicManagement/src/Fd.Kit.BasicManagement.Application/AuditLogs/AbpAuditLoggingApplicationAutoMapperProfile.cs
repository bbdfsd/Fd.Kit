using AutoMapper;
using Volo.Abp.AuditLogging;


namespace Fd.Kit.BasicManagement.AuditLogs
{

    public class AbpAuditLoggingApplicationAutoMapperProfile : Profile
    {
        public AbpAuditLoggingApplicationAutoMapperProfile()
        {
            CreateMap<AuditLog, AuditLogDto>().MapExtraProperties();

            CreateMap<EntityChange, EntityChangeDto>().MapExtraProperties();

            CreateMap<EntityChangeWithUsername, EntityChangeWithUsernameDto>();

            CreateMap<EntityPropertyChange, EntityPropertyChangeDto>();

            CreateMap<AuditLogAction, AuditLogActionDto>().MapExtraProperties();
        }
    }
}