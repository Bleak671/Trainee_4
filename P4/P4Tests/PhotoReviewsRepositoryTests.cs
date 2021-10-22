using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using P4.DAL;
using P4.Models;
using System;

namespace P4Tests
{
    [TestFixture]
    class PhotoReviewsRepositoryTests
    {
        AppDBContext _context;
        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<AppDBContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
            _context = new AppDBContext(options);
            _context.Users.Add(new User { UserId = Guid.Parse("11111111-1111-1111-1111-111111111111"), Email = "", HashedPassword = "", isAdmin = false, isBanned = false, Login = "" });
            _context.Photos.Add(new Photo { PhotoId = Guid.Parse("11111111-1111-1111-1111-111111111111"), Link = "", UserId = Guid.Parse("11111111-1111-1111-1111-111111111111") });
            _context.SaveChanges();
        }

        [TestCase("31231234-1234-1242-1242-123412341234", "11111111-1111-1111-1111-111111111111", "11111111-1111-1111-1111-111111111111")]
        public void PhotoReviewsRepository_Create_ShouldNotThrow(string id, string pId, string uId)
        {
            using (PhotoReviewsRepository db = new PhotoReviewsRepository(_context))
            {
                Assert.DoesNotThrow(() => db.Create(new PhotoReview { PhotoReviewId = Guid.Parse(id), PhotoId = Guid.Parse(pId), UserId = Guid.Parse(uId) }));
            }
        }

        [TestCase("31231234-1234-1242-1242-123412341234", "11111111-1111-1111-1111-111111111111", "11111111-1111-1111-1111-111111111111")]
        public void PhotoReviewsRepository_Create_ShouldThrow(string id, string pId, string uId)
        {
            using (PhotoReviewsRepository db = new PhotoReviewsRepository(_context))
            {
                PhotoReview photo = new PhotoReview { PhotoReviewId = Guid.Parse(id), PhotoId = Guid.Parse(pId), UserId = Guid.Parse(uId) };
                db.Create(photo);
                Assert.Throws(typeof(Exception), () => db.Create(photo));
            }
        }

        [TestCase("31231234-1234-1242-1242-123412341234", "11111111-1111-1111-1111-111111111111", "11111111-1111-1111-1111-111111111111")]
        public void PhotoReviewsRepository_Update_ShouldNotThrow(string id, string pId, string uId)
        {
            using (PhotoReviewsRepository db = new PhotoReviewsRepository(_context))
            {
                PhotoReview photo = new PhotoReview { PhotoReviewId = Guid.Parse(id), PhotoId = Guid.Parse(pId), UserId = Guid.Parse(uId) };
                db.Create(photo);
                Assert.DoesNotThrow(() => db.Update(photo));
            }

        }

        [TestCase("31231234-1234-1242-1242-123412341234", "11111111-1111-1111-1111-111111111111", "11111111-1111-1111-1111-111111111111")]
        public void PhotoReviewsRepository_Update_ShouldThrow(string id, string pId, string uId)
        {
            using (PhotoReviewsRepository db = new PhotoReviewsRepository(_context))
            {
                Assert.Throws(typeof(Exception), () => db.Update(new PhotoReview { PhotoReviewId = Guid.Parse(id), PhotoId = Guid.Parse(pId), UserId = Guid.Parse(uId) }));
            }

        }

        [TestCase("31231234-1234-1242-1242-123412341235")]
        public void PhotoReviewsRepository_Delete_ShouldNotThrow(string id)
        {
            using (PhotoReviewsRepository db = new PhotoReviewsRepository(_context))
            {
                PhotoReview photo = new PhotoReview { PhotoReviewId = Guid.Parse(id), PhotoId = Guid.Parse("11111111-1111-1111-1111-111111111111"), UserId = Guid.Parse("11111111-1111-1111-1111-111111111111") };
                db.Create(photo);
                Assert.DoesNotThrow(() => db.Delete(photo.PhotoReviewId));
            }
        }

        [TestCase("11111111-1111-1111-1111-111111111111")]
        public void PhotoReviewsRepository_Delete_ShouldThrow(string id)
        {
            using (PhotoReviewsRepository db = new PhotoReviewsRepository(_context))
            {
                Assert.Throws(typeof(Exception), () => db.Delete(Guid.Parse(id)));
            }
        }
    }
}