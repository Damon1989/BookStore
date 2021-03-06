﻿namespace Damon.BookStore.Books
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;

    using Shouldly;

    using Volo.Abp.Application.Dtos;
    using Volo.Abp.Validation;

    using Xunit;

    public class BookAppService_Tests : BookStoreApplicationTestBase
    {
        private readonly IBookAppService _bookAppService;

        public BookAppService_Tests()
        {
            this._bookAppService = this.GetRequiredService<IBookAppService>();
        }

        [Fact]
        public async Task Should_Create_A_Valid_Book()
        {
            // Act
            var result = await this._bookAppService.CreateAsync(
                             new CreateUpdateBookDto
                                 {
                                     Name = "New test book 42",
                                     Price = 10,
                                     PublishDate = DateTime.Now,
                                     Type = BookType.ScienceFiction
                                 });

            // Assert
            result.Id.ShouldNotBe(Guid.Empty);
            result.Name.ShouldBe("New test book 42");
        }

        [Fact]
        public async Task Should_Get_List_Of_Books()
        {
            var result = await this._bookAppService.GetListAsync(new PagedAndSortedResultRequestDto());
            result.TotalCount.ShouldBeGreaterThan(0);
            result.Items.ShouldContain(b => b.Name == "1984");
        }

        [Fact]
        public async Task Should_Not_Create_A_Book_Without_Name()
        {
            var exception = await Assert.ThrowsAsync<AbpValidationException>(
                                async () =>
                                    {
                                        await this._bookAppService.CreateAsync(
                                            new CreateUpdateBookDto
                                                {
                                                    Name = string.Empty,
                                                    Price = 10,
                                                    PublishDate = DateTime.Now,
                                                    Type = BookType.ScienceFiction
                                                });
                                    });

            exception.ValidationErrors.ShouldContain(err => err.MemberNames.Any(mem => mem == "Name"));
        }
    }
}