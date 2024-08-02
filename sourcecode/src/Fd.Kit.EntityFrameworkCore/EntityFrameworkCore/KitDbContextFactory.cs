using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Fd.Kit.EntityFrameworkCore;

/* This class is needed for EF Core console commands
 * (like Add-Migration and Update-Database commands) */
public class KitDbContextFactory : IDesignTimeDbContextFactory<KitDbContext>
{
    public KitDbContext CreateDbContext(string[] args)
    {
        var configuration = BuildConfiguration();
        
        KitEfCoreEntityExtensionMappings.Configure();

        var builder = new DbContextOptionsBuilder<KitDbContext>()
            .UseSqlServer(configuration.GetConnectionString("Default"));
        
        return new KitDbContext(builder.Options);
    }

    private static IConfigurationRoot BuildConfiguration()
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../Fd.Kit.DbMigrator/"))
            .AddJsonFile("appsettings.json", optional: false);

        return builder.Build();
    }
}
