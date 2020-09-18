namespace Damon.BookStore.Books
{
    using Microsoft.AspNetCore.Authorization;
    using System;
    using Volo.Abp.Application.Dtos;
    using Volo.Abp.Application.Services;
    using Volo.Abp.Domain.Repositories;
    using Volo.Abp.Users;

    [Authorize]
    public class BookAppService:CrudAppService<Book,BookDto,Guid,PagedAndSortedResultRequestDto,CreateUpdateBookDto>,IBookAppService
    {
        private readonly CurrentUser _currentUser;

        public BookAppService(IRepository<Book, Guid> repository,CurrentUser currentUser)
            : base(repository)
        {
            this._currentUser = currentUser;
        }

        
        public CurrentUser GetUser()
        {
            return _currentUser;
        }
    }
}