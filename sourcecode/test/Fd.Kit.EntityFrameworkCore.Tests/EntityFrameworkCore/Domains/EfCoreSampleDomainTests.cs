using Fd.Kit.Samples;
using Xunit;

namespace Fd.Kit.EntityFrameworkCore.Domains;

[Collection(KitTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<KitEntityFrameworkCoreTestModule>
{

}
