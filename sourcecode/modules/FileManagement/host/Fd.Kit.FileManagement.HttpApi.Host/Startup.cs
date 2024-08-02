using Microsoft.Extensions.Logging;

namespace Fd.KitFileManagement;

public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddApplication<FileManagementHttpApiHostModule>();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
    {
        app.InitializeApplication();
    }
}