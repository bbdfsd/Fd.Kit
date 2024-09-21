using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace Fd.Kit.BasicManagement.EntityFrameworkCore;

public class BasicManagementHttpApiHostMigrationsDbContextFactory : IDesignTimeDbContextFactory<BasicManagementHttpApiHostMigrationsDbContext>
{
    public BasicManagementHttpApiHostMigrationsDbContext CreateDbContext(string[] args)
    {
        var configuration = BuildConfiguration();

        var builder = new DbContextOptionsBuilder<BasicManagementHttpApiHostMigrationsDbContext>()
            .UseSqlServer(configuration.GetConnectionString("Default"));

        return new BasicManagementHttpApiHostMigrationsDbContext(builder.Options);
    }

    private static IConfigurationRoot BuildConfiguration()
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false);

        return builder.Build();
    }
}
