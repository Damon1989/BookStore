using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Damon.BookStore.Books;
using Microsoft.AspNetCore.Mvc;

namespace Damon.BookStore.Web.Controllers
{
    public class BookController : Controller
    {
        public BookController()
        {
            
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult CreateModal()
        {
            var book = new CreateUpdateBookDto();
            return View(book);
        }
    }
}
