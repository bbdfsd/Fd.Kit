using Fd.Kit.BasicManagement.EntityFrameworkCore;
using Fd.Kit.BasicManagement.FdCore.Swagger;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using StackExchange.Redis;
using Swashbuckle.AspNetCore.SwaggerUI;
using System.Text;
using Volo.Abp;
using Volo.Abp.AspNetCore.ExceptionHandling;
using Volo.Abp.AspNetCore.Mvc.UI.MultiTenancy;
using Volo.Abp.AspNetCore.Serilog;
using Volo.Abp.Autofac;
using Volo.Abp.Caching;
using Volo.Abp.Caching.StackExchangeRedis;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.Modularity;
using Volo.Abp.Swashbuckle;
using Volo.Abp.VirtualFileSystem;

namespace Fd.Kit.BasicManagement;

[DependsOn(
    typeof(BasicManagementApplicationModule),
    typeof(BasicManagementEntityFrameworkCoreModule),
    typeof(BasicManagementHttpApiModule),
    typeof(AbpAspNetCoreMvcUiMultiTenancyModule),
    typeof(AbpAutofacModule),
    typeof(AbpCachingStackExchangeRedisModule),
    typeof(AbpEntityFrameworkCoreModule), // AbpEntityFrameworkCorePostgreSqlModule、AbpEntityFrameworkCoreMySQLModule
    typeof(AbpAspNetCoreSerilogModule),
    typeof(AbpSwashbuckleModule)
)]
public class BasicManagementHttpApiHostModule : AbpModule
{
    private const string DefaultCorsPolicyName = "Default";

    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        ConfigureCache(context);
        ConfigureSwaggerServices(context);
        ConfigureJwtAuthentication(context);

        Configure<AbpDbContextOptions>(options =>
        {
            options.UseSqlServer();
        });
        Configure<AbpExceptionHandlingOptions>(options =>
        {
            options.SendExceptionsDetailsToClients = false;
        });
        ConfigureVirtualFileSystem(context);
    }

    public override void OnApplicationInitialization(ApplicationInitializationContext context)
    {
        var app = context.GetApplicationBuilder();

        app.UseCorrelationId();
        app.UseStaticFiles();
        app.UseRouting();
        app.UseCors();
        app.UseAuthentication();
        app.UseMultiTenancy();
        app.UseAbpRequestLocalization();
        app.UseAuthorization();
        app.UseSwagger();
        app.UseAbpSwaggerUI(options =>
        {
            options.SwaggerEndpoint("/swagger/BasicManagement/swagger.json", "BasicManagement API");
            options.DocExpansion(DocExpansion.None);
            options.DefaultModelsExpandDepth(-1);
        });
        app.UseAuditing();
        app.UseAbpSerilogEnrichers();
        app.UseConfiguredEndpoints();
    }
    /// <summary>
    /// 配置虚拟文件系统
    /// </summary>
    /// <param name="context"></param>
    private void ConfigureVirtualFileSystem(ServiceConfigurationContext context)
    {
        Configure<AbpVirtualFileSystemOptions>(options =>
        {
            options.FileSets.AddEmbedded<BasicManagementHttpApiHostModule>();
        });
    }
    /// <summary>
    /// Redis缓存
    /// </summary>
    private void ConfigureCache(ServiceConfigurationContext context)
    {
        Configure<AbpDistributedCacheOptions>(
            options => { options.KeyPrefix = "AbpPro:"; });
        var configuration = context.Services.GetConfiguration();
        var redis = ConnectionMultiplexer.Connect(configuration["Redis:Configuration"]);
        context.Services
            .AddDataProtection()
            .PersistKeysToStackExchangeRedis(redis, "AbpPro-Protection-Keys");
    }

    private static void ConfigureSwaggerServices(ServiceConfigurationContext context)
    {
        context.Services.AddSwaggerGen(
            options =>
            {
                // 文件下载类型
                options.MapType<FileContentResult>(() => new OpenApiSchema() { Type = "file" });

                options.SwaggerDoc("BasicManagement",
                    new OpenApiInfo { Title = "BasicManagement API", Version = "v1" });
                options.DocInclusionPredicate((docName, description) => true);
                options.EnableAnnotations(); // 启用注解
                options.DocumentFilter<HiddenAbpDefaultApiFilter>();
                options.SchemaFilter<EnumSchemaFilter>();
                // 加载所有xml注释，这里会导致swagger加载有点缓慢
                var xmlPaths = Directory.GetFiles(AppContext.BaseDirectory, "*.xml");
                foreach (var xml in xmlPaths)
                {
                    options.IncludeXmlComments(xml, true);
                }

                options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme,
                    new OpenApiSecurityScheme()
                    {
                        Description = "直接在下框输入JWT生成的Token",
                        Name = "Authorization",
                        In = ParameterLocation.Header,
                        Type = SecuritySchemeType.Http,
                        Scheme = JwtBearerDefaults.AuthenticationScheme,
                        BearerFormat = "JWT"
                    });
                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme, Id = "Bearer"
                            }
                        },
                        new List<string>()
                    }
                });

                options.AddSecurityDefinition("ApiKey", new OpenApiSecurityScheme()
                {
                    Type = SecuritySchemeType.ApiKey,
                    In = ParameterLocation.Header,
                    Name = "Accept-Language",
                    Description = "多语言设置，系统预设语言有zh-Hans、en，默认为zh-Hans",
                });

                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                                { Type = ReferenceType.SecurityScheme, Id = "ApiKey" }
                        },
                        Array.Empty<string>()
                    }
                });
            });
    }

    /// <summary>
    /// 配置JWT
    /// </summary>
    private void ConfigureJwtAuthentication(ServiceConfigurationContext context)
    {
        var configuration = context.Services.GetConfiguration();
        context.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters =
                    new TokenValidationParameters()
                    {
                        // 是否开启签名认证
                        ValidateIssuerSigningKey = true,
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        //ClockSkew = TimeSpan.Zero,
                        ValidIssuer = configuration["Jwt:Issuer"],
                        ValidAudience = configuration["Jwt:Audience"],
                        IssuerSigningKey =
                            new SymmetricSecurityKey(
                                Encoding.ASCII.GetBytes(configuration["Jwt:SecurityKey"]))
                    };

                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = currentContext =>
                    {
                        var path = currentContext.HttpContext.Request.Path;
                        if (path.StartsWithSegments("/login"))
                        {
                            return Task.CompletedTask;
                        }

                        var accessToken = string.Empty;
                        if (currentContext.HttpContext.Request.Headers.ContainsKey("Authorization"))
                        {
                            accessToken = currentContext.HttpContext.Request.Headers["Authorization"];
                            if (!string.IsNullOrWhiteSpace(accessToken))
                            {
                                accessToken = accessToken.Split(" ").LastOrDefault();
                            }
                        }

                        if (accessToken.IsNullOrWhiteSpace())
                        {
                            accessToken = currentContext.Request.Query["access_token"].FirstOrDefault();
                        }

                        if (accessToken.IsNullOrWhiteSpace())
                        {
                            accessToken = currentContext.Request.Cookies[DefaultCorsPolicyName];
                        }

                        currentContext.Token = accessToken;
                        currentContext.Request.Headers.Remove("Authorization");
                        currentContext.Request.Headers.Add("Authorization", $"Bearer {accessToken}");

                        return Task.CompletedTask;
                    }
                };
            });
    }
}