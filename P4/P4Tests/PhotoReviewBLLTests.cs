using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using NUnit.Framework;
using P4.BLL;
using P4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace P4.Tests
{
    [TestFixture]
    class PhotoReviewBLLTests
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
            _context.PhotoReviews.Add(new PhotoReview { PhotoReviewId = Guid.Parse("31231234-1234-1242-1242-123412341234"), PhotoId = Guid.Parse("11111111-1111-1111-1111-111111111111"), UserId = Guid.Parse("11111111-1111-1111-1111-111111111111") });
            _context.SaveChanges();
        }

        [TestCase("31231234-1234-1242-1242-123412341235", "11111111-1111-1111-1111-111111111111", "11111111-1111-1111-1111-111111111111")]
        public void PhotoReviewBLL_Create_ShouldNotThrow(string id, string pId, string uId)
        {
            using (PhotoReviewBLL db = new PhotoReviewBLL(_context))
            {
                PhotoReview photo = new PhotoReview { PhotoReviewId = Guid.Parse(id), PhotoId = Guid.Parse(pId), UserId = Guid.Parse(uId) };

                Assert.DoesNotThrow(() => db.CreatePhotoReview(JsonConvert.SerializeObject(photo)));
            }
        }

        [TestCase("31231234-1234-1242-1242-123412341234")]
        public void PhotoReviewBLL_Read_ShouldNotThrow(string id)
        {
            using (PhotoReviewBLL db = new PhotoReviewBLL(_context))
            {
                Assert.DoesNotThrow(() => db.GetReview(id));
            }
        }

        [TestCase("31231234-1234-1242-1242-123412341234")]
        public void PhotoReviewBLL_Delete_ShouldNotThrow(string id)
        {
            using (PhotoReviewBLL db = new PhotoReviewBLL(_context))
            {
                Assert.DoesNotThrow(() => db.DeleteReview(id));
            }
        }
    }
}
