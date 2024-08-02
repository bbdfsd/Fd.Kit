using Fd.Kit.BasicManagement.Localization;
using Volo.Abp.Identity.Settings;
using Volo.Abp.Localization;
using Volo.Abp.Settings;
using Volo.Abp.Timing;

namespace Fd.Kit.BasicManagement.Settings;

public class BasicManagementSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        OverrideDefaultSettings(context);
    }

    /// <summary>
    /// 重写默认 Setting 添加自定义属性
    /// </summary>
    private static void OverrideDefaultSettings(ISettingDefinitionContext context)
    {
        context.Add(
            new SettingDefinition(TimingSettingNames.TimeZone, "China Standard Time", L("DisplayName:Abp.Timing.Timezone"), L("Description:Abp.Timing.Timezone"))
                .WithProperty(BasicManagementSettings.Group.Default, BasicManagementSettings.Group.SystemManagement)
                .WithProperty(BasicManagementConsts.ControlType.Default, BasicManagementConsts.ControlType.TypeText));

        context.GetOrNull(IdentitySettingNames.Password.RequiredLength)
            .WithProperty(BasicManagementSettings.Group.Default, BasicManagementSettings.Group.SystemManagement)
            .WithProperty(BasicManagementConsts.ControlType.Default, BasicManagementConsts.ControlType.TypeNumber);

        context.GetOrNull(IdentitySettingNames.Password.RequiredUniqueChars)
            .WithProperty(BasicManagementSettings.Group.Default, BasicManagementSettings.Group.SystemManagement)
            .WithProperty(BasicManagementConsts.ControlType.Default, BasicManagementConsts.ControlType.TypeNumber);

        context.GetOrNull(IdentitySettingNames.Password.RequireNonAlphanumeric)
            .WithProperty(BasicManagementSettings.Group.Default, BasicManagementSettings.Group.SystemManagement)
            .WithProperty(BasicManagementConsts.ControlType.Default, BasicManagementConsts.ControlType.TypeCheckBox);

        context.GetOrNull(IdentitySettingNames.Password.RequireLowercase)
            .WithProperty(BasicManagementSettings.Group.Default, BasicManagementSettings.Group.SystemManagement)
            .WithProperty(BasicManagementConsts.ControlType.Default, BasicManagementConsts.ControlType.TypeCheckBox);

        context.GetOrNull(IdentitySettingNames.Password.RequireUppercase)
            .WithProperty(BasicManagementSettings.Group.Default, BasicManagementSettings.Group.SystemManagement)
            .WithProperty(BasicManagementConsts.ControlType.Default, BasicManagementConsts.ControlType.TypeCheckBox);

        context.GetOrNull(IdentitySettingNames.Password.RequireDigit)
            .WithProperty(BasicManagementSettings.Group.Default, BasicManagementSettings.Group.SystemManagement)
            .WithProperty(BasicManagementConsts.ControlType.Default, BasicManagementConsts.ControlType.TypeCheckBox);

        context.GetOrNull(IdentitySettingNames.Lockout.LockoutDuration)
            .WithProperty(BasicManagementSettings.Group.Default, BasicManagementSettings.Group.SystemManagement)
            .WithProperty(BasicManagementConsts.ControlType.Default, BasicManagementConsts.ControlType.TypeNumber);

        context.GetOrNull(IdentitySettingNames.Lockout.MaxFailedAccessAttempts)
            .WithProperty(BasicManagementSettings.Group.Default, BasicManagementSettings.Group.SystemManagement)
            .WithProperty(BasicManagementConsts.ControlType.Default, BasicManagementConsts.ControlType.TypeNumber);
    }


    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<BasicManagementResource>(name);
    }
}