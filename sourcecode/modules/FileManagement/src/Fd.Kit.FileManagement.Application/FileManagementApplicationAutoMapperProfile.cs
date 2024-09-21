namespace Fd.Kit.FileManagement;

public class FileManagementApplicationAutoMapperProfile : Profile
{
    public FileManagementApplicationAutoMapperProfile()
    {
        CreateMap<Fd.Kit.FileManagement.Files.File, PagingFileOutput>();
    }
}