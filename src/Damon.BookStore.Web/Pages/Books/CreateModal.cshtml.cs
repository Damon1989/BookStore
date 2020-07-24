﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Damon.BookStore.Books;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Damon.BookStore.Web.Pages.Books
{
    public class CreateModalModal : BookStorePageModel
    {
        [BindProperty]
        public CreateUpdateBookDto Book { get; set; }
        private readonly IBookAppService _bookAppService;

        public CreateModalModal(IBookAppService bookAppService)
        {
            this._bookAppService = bookAppService;
        }
        public void OnGet()
        {
            Book = new CreateUpdateBookDto();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            await _bookAppService.CreateAsync(Book);
            return NoContent();
        }
    }
}