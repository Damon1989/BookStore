namespace Damon.BookStore.Web.Pages.Books
{
    using System;
    using System.Threading.Tasks;


    using Damon.BookStore.Books;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.RazorPages;

    public class EditModalModel : BookStorePageModel
    {
        private readonly IBookAppService _bookAppService;

        public EditModalModel(IBookAppService bookAppService)
        {
            this._bookAppService = bookAppService;
        }

        [BindProperty]
        public CreateUpdateBookDto Book { get; set; }

        [HiddenInput]
        [BindProperty(SupportsGet = true)]
        public Guid Id { get; set; }

        public async Task OnGetAsync()
        {
            var bookDto = await _bookAppService.GetAsync(Id);
            Book = ObjectMapper.Map<BookDto, CreateUpdateBookDto>(bookDto);
        }

        public async Task<IActionResult> OnPostAsync()
        {
            await _bookAppService.UpdateAsync(Id, Book);
            return NoContent();
        }
    }
}