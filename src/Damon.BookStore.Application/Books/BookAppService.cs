namespace Damon.BookStore.Books
{
    using System;
    using Volo.Abp.Application.Dtos;
    using Volo.Abp.Application.Services;
    using Volo.Abp.Domain.Repositories;

    public class BookAppService:CrudAppService<Book,BookDto,Guid,PagedAndSortedResultRequestDto,CreateUpdateBookDto>,IBookAppService
    {
        public BookAppService(IRepository<Book, Guid> repository)
            : base(repository)
        {
        }
    }
}