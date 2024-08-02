namespace Fd.KitFileManagement.EntityFrameworkCore;

public class FileManagementHttpApiHostMigrationsDbContextFactory : IDesignTimeDbContextFactory<FileManagementHttpApiHostMigrationsDbContext>
{
    public FileManagementHttpApiHostMigrationsDbContext CreateDbContext(string[] args)
    {
        var configuration = BuildConfiguration();

        var builder = new DbContextOptionsBuilder<FileManagementHttpApiHostMigrationsDbContext>()
            .UseMySql(configuration.GetConnectionString(FileManagementDbProperties.ConnectionStringName), MySqlServerVersion.LatestSupportedServerVersion);
        return new FileManagementHttpApiHostMigrationsDbContext(builder.Options);
    }

    private static IConfigurationRoot BuildConfiguration()
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false);

        return builder.Build();
    }
}
