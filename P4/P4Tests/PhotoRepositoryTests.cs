using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using P4.DAL;
using P4.Models;
using System;

namespace P4Tests
{
    [TestFixture]
    class PhotoRepositoryTests
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
            _context.SaveChanges();
        }

        [TestCase("31231234-1234-1242-1242-123412341234", "asd.com", "11111111-1111-1111-1111-111111111111")]
        public void PhotoRepository_Create_ShouldNotThrow(string id, string link, string uId)
        {
            using (PhotoRepository db = new PhotoRepository(_context))
            {
                Assert.DoesNotThrow(() => db.Create(new Photo { PhotoId = Guid.Parse(id), Link = link, UserId = Guid.Parse(uId) }));

            }
        }

        [TestCase("31231234-1234-1242-1242-123412341234", null, null)]
        public void PhotoRepository_Create_ShouldThrow(string id, string link, Guid uId)
        {
            using (PhotoRepository db = new PhotoRepository(_context))
            {
                Photo photo = new Photo { PhotoId = Guid.Parse(id), Link = link, UserId = uId };
                db.Create(photo);
                Assert.Throws(typeof(Exception), () => db.Create(photo));
            }
        }

        [TestCase("31231234-1234-1242-1242-123412341234", "asd.com", "11111111-1111-1111-1111-111111111111")]
        public void PhotoRepository_Update_ShouldNotThrow(string id, string link, string uId)
        {
            using (PhotoRepository db = new PhotoRepository(_context))
            {
                Photo photo = new Photo { PhotoId = Guid.Parse(id), Link = link, UserId = Guid.Parse(uId) };
                db.Create(photo);
                photo.Link = "qweqweqs.add";
                Assert.DoesNotThrow(() => db.Update(photo));
            }

        }

        [TestCase("31231234-1234-1242-1242-123412341234", "asd.com", "11111111-1111-1111-1111-111111111111")]
        public void PhotoRepository_Update_ShouldThrow(string id, string link, string uId)
        {
            using (PhotoRepository db = new PhotoRepository(_context))
            {
                Assert.Throws(typeof(Exception), () => db.Update(new Photo { PhotoId = Guid.Parse(id), Link = link, UserId = Guid.Parse(uId) }));
            }

        }

        [TestCase("31231234-1234-1242-1242-123412341235")]
        public void PhotoRepository_Delete_ShouldNotThrow(string id)
        {
            using (PhotoRepository db = new PhotoRepository(_context))
            {
                Photo photo = new Photo { PhotoId = Guid.Parse(id), Link = "", UserId = Guid.Parse("11111111-1111-1111-1111-111111111111") };
                db.Create(photo);
                Assert.DoesNotThrow(() => db.Delete(photo.PhotoId));
            }
        }

        [TestCase(null)]
        public void PhotoRepository_Delete_ShouldThrow(Guid id)
        {
            using (PhotoRepository db = new PhotoRepository(_context))
            {
                Assert.Throws(typeof(Exception), () => db.Delete(id));
            }
        }
    }
}
