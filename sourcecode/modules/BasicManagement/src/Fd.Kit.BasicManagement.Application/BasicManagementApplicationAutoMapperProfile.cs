using AutoMapper;
using Fd.Kit.BasicManagement.IdentitySecurityLogs;
using Fd.Kit.BasicManagement.OrganizationUnits.Dto;
using Fd.Kit.BasicManagement.Tenants.Dtos;
using Fd.Kit.BasicManagement.Users.Dtos;
using Volo.Abp.Identity;
using Volo.Abp.TenantManagement;

namespace Fd.Kit.BasicManagement;

public class BasicManagementApplicationAutoMapperProfile : Profile
{
    public BasicManagementApplicationAutoMapperProfile()
    {


        CreateMap<Volo.Abp.Identity.IdentityUser, LoginOutput>()
            .ForMember(dest => dest.Token, opt => opt.Ignore());
        CreateMap<IdentityUser, ExportIdentityUserOutput>()
            .ForMember(e => e.CreationTimeFormat, opt => opt.Ignore())
            .ForMember(e => e.Status, opt => opt.Ignore());
        CreateMap<IdentityUser, FdUserDto>()
            .ForMember(e => e.roleNames, opt => opt.Ignore());

        CreateMap<OrganizationUnit, OrganizationUnitDto>();
        CreateMap<OrganizationUnitRole, OrganizationUnitRoleDto>();
        CreateMap<IdentityUser, GetOrganizationUnitUserOutput>();
        CreateMap<IdentityUser, GetUnAddUserOutput>();
        CreateMap<IdentityRole, GetOrganizationUnitRoleOutput>();
        CreateMap<IdentityRole, GetUnAddRoleOutput>();
        CreateMap<IdentitySecurityLog, IdentitySecurityLogDto>();
        CreateMap<TenantConnectionString, PageTenantConnectionStringOutput>();
    }
}