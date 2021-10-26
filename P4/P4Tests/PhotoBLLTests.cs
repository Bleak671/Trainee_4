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
    class PhotoBLLTests
    {
        AppDBContext _context;
        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<AppDBContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
            _context = new AppDBContext(options);
            _context.Photos.Add(new Photo { PhotoId = Guid.Parse("31231234-1234-1242-1242-123412341234"), Link = "", UserId = Guid.Parse("11111111-1111-1111-1111-111111111111") });
            _context.SaveChanges();
        }

        [TestCase("31231234-1234-1242-1242-123412341235", "asd.com", "11111111-1111-1111-1111-111111111111")]
        public void PhotoBLL_Create_ShouldNotThrow(string id, string link, string uId)
        {
            using (PhotoBLL db = new PhotoBLL(_context))
            {
                Photo photo = new Photo { PhotoId = Guid.Parse(id), Link = link, UserId = Guid.Parse(uId) };

                Assert.DoesNotThrow(() => db.CreatePhoto(JsonConvert.SerializeObject(photo)));
            }
        }

        [TestCase("31231234-1234-1242-1242-123412341234")]
        public void PhotoBLL_Read_ShouldNotThrow(string id)
        {
            using (PhotoBLL db = new PhotoBLL(_context))
            {
                Assert.DoesNotThrow(() => db.GetPhoto(id));
            }
        }

        [TestCase("31231234-1234-1242-1242-123412341234", "asd.com", "11111111-1111-1111-1111-111111111111")]
        public void PhotoBLL_Delete_ShouldNotThrow(string id, string link, string uId)
        {
            using (PhotoBLL db = new PhotoBLL(_context))
            {
                Assert.DoesNotThrow(() => db.DeletePhoto(id));
            }
        }
    }
}
