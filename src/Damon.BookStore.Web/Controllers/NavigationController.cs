using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Volo.Abp.UI.Navigation;

namespace Damon.BookStore.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NavigationController : ControllerBase
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
    }
}