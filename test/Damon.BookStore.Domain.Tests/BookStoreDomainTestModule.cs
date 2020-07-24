using Damon.BookStore.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace Damon.BookStore
{
    [DependsOn(
        typeof(BookStoreEntityFrameworkCoreTestModule)
        )]
    public class BookStoreDomainTestModule : AbpModule
    {

    }
}