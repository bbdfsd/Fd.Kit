using Volo.Abp.Settings;

namespace Fd.Kit.Settings;

public class KitSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(KitSettings.MySetting1));
    }
}
