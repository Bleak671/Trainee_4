using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using NUnit.Framework;
using P4.BLL;
using P4.DAL;
using P4.Models;
using P4.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace P4.Tests
{
    [TestFixture]
    class UserBLLTests
    {
        UserRepository _context;
        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<AppDBContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
            _context = new UserRepository(new AppDBContext(options));
            _context.Create(new User { UserId = Guid.Parse("31231234-1234-1242-1242-123412341234"), Email = "zxc", HashedPassword = "qwe", isAdmin = false, isBanned = false, Login = "asd" });  
        }

        [TestCase("31231234-1234-1242-1242-123412341235", "asd", "qwe", "tre")]
        public void UserBLL_Create_ShouldNotThrow(string id, string email, string hPass, string login)
        {
            using (UserBLL db = new UserBLL(_context))
            {
                User u = new User { UserId = Guid.Parse(id), Email = email, HashedPassword = hPass, isAdmin = false, isBanned = false, Login = login };
                
                Assert.DoesNotThrow(() => db.CreateUser(u));
            }
        }

        [TestCase("31231234-1234-1242-1242-123412341234", "asd", "qwe", "tre")]
        public void UserBLL_Read_ShouldNotThrow(string id, string email, string hPass, string login)
        {
            using (UserBLL db = new UserBLL(_context))
            {
                Assert.DoesNotThrow(() => db.GetUser(Guid.Parse(id)));
            }
        }

        [TestCase("31231234-1234-1242-1242-123412341234", "asd", "qwe", "tre")]
        public void UserBLL_Delete_ShouldNotThrow(string id, string email, string hPass, string login)
        {
            using (UserBLL db = new UserBLL(_context))
            {
                Assert.DoesNotThrow(() => db.DeleteUser(Guid.Parse(id)));
            }
        }

        [TestCase("zxc", "qwe")]
        public void UserBLL_GetToken_ShouldNotThrow(string email, string password)
        {
            using (AuthUtility db = new AuthUtility(_context))
            {
                object result = db.GetJWT(email, password);
                Assert.NotNull(result);
            }
        }
    }
}
