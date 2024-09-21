﻿using Localization.Resources.AbpUi;
using Fd.Kit.BasicManagement.Localization;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Localization;
using Volo.Abp.Modularity;
using Microsoft.Extensions.DependencyInjection;

namespace Fd.Kit.BasicManagement;

[DependsOn(
    typeof(BasicManagementApplicationContractsModule),
    typeof(AbpAspNetCoreMvcModule))]
public class BasicManagementHttpApiModule : AbpModule
{
    public override void PreConfigureServices(ServiceConfigurationContext context)
    {
        PreConfigure<IMvcBuilder>(mvcBuilder =>
        {
            mvcBuilder.AddApplicationPartIfNotExists(typeof(BasicManagementHttpApiModule).Assembly);
        });
    }

    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpLocalizationOptions>(options =>
        {
            options.Resources
                .Get<BasicManagementResource>()
                .AddBaseTypes(typeof(AbpUiResource));
        });
    }
}
