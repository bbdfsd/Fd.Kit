namespace Fd.KitFileManagement;

[DependsOn(
    typeof(FileManagementApplicationModule),
    typeof(FileManagementDomainTestModule)
)]
public class FileManagementApplicationTestModule : AbpModule
{
}