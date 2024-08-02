using Volo.Abp.Modularity;

namespace Fd.Kit.BasicManagement;

[DependsOn(
    typeof(BasicManagementApplicationModule),
    typeof(BasicManagementDomainTestModule)
    )]
public class BasicManagementApplicationTestModule : AbpModule
{

}
