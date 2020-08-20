using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Volo.Abp;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Localization;
using Volo.Abp.Timing;
using Volo.Abp.UI.Navigation;

namespace Damon.BookStore.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NavigationController : AbpController
    {
        private readonly IMenuManager _menuManager;

        public NavigationController(IMenuManager menuManager)
        {
            _menuManager = menuManager;
        }

        [HttpGet]
        [Route("getlist")]
        [AllowAnonymous]
        public async Task<JsonResult> GetMenu()
        {
            var mainMenu = await _menuManager.GetAsync(StandardMenus.Main);
            var result= mainMenu.Items;
            return new JsonResult(result);
        }

        [HttpGet]
        [Route("changelanguage")]
        [AllowAnonymous]
        public void Switch(string culture, string uiCulture = "", string returnUrl = "")
        {
            if (!CultureHelper.IsValidCultureCode(culture))
            {
                throw new AbpException("Unknown language: " + culture + ". It must be a valid culture!");
            }

            string cookieValue = CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(culture, uiCulture));

            Response.Cookies.Append(CookieRequestCultureProvider.DefaultCookieName, cookieValue, new CookieOptions
            {
                Expires = Clock.Now.AddYears(2)
            });

        }
    }
}