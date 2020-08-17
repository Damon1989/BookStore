namespace Damon.BookStore.Web.Menus
{
    using System.Threading.Tasks;

    using Damon.BookStore.Localization;
    using Damon.BookStore.MultiTenancy;

    using Volo.Abp.TenantManagement.Web.Navigation;
    using Volo.Abp.UI.Navigation;

    public class BookStoreMenuContributor : IMenuContributor
    {
        public async Task ConfigureMenuAsync(MenuConfigurationContext context)
        {
            if (context.Menu.Name == StandardMenus.Main)
            {
                await this.ConfigureMainMenuAsync(context);
            }
        }

        private async Task ConfigureMainMenuAsync(MenuConfigurationContext context)
        {
            if (!MultiTenancyConsts.IsEnabled)
            {
                var administration = context.Menu.GetAdministration();
                administration.TryRemoveMenuItem(TenantManagementMenuNames.GroupName);
            }

            var l = context.GetLocalizer<BookStoreResource>();

            context.Menu.Items.Insert(
                0,
                new ApplicationMenuItem("BookStore.Home", l["Menu:Home"], "/Home/MainPageIndex"));
            context.Menu.AddItem(new ApplicationMenuItem("BookStore", l["Menu:BookStore"], icon: "fa fa-book")).AddItem(
                new ApplicationMenuItem("BookStore.Books", l["Menu:Books"], "/Books"));
        }
    }
}