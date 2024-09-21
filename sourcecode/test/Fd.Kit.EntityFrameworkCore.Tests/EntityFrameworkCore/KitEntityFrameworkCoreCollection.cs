using Xunit;

namespace Fd.Kit.EntityFrameworkCore;

[CollectionDefinition(KitTestConsts.CollectionDefinitionName)]
public class KitEntityFrameworkCoreCollection : ICollectionFixture<KitEntityFrameworkCoreFixture>
{

}
