using Microsoft.Extensions.Configuration;
using Serilog;

namespace Fd.Kit.BasicManagement
{
    public static class SerilogToEsExtensions
    {
        public static void SetSerilogConfiguration(LoggerConfiguration loggerConfiguration, IConfiguration configuration)
        {
            // 默认读取 configuration 中 "Serilog" 节点下的配置
            loggerConfiguration
                .ReadFrom.Configuration(configuration)
                .Enrich.FromLogContext();
        }
    }
}