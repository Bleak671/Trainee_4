using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using P4.DAL;
using P4.Models;
using System;

namespace P4Tests
{
    [TestFixture]
    public class UserRepositoryTests
    {
        AppDBContext _context;
        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<AppDBContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
            _context = new AppDBContext(options);
        }

        [TestCase("31231234-1234-1242-1242-123412341234", "asd", "qwe", "tre")]
        public void UserRepository_Create_ShouldNotThrow(string id, string email, string hPass, string login)
        {
            using (UserRepository db = new UserRepository(_context))
            {
                Assert.DoesNotThrow(() => db.Create(new User { UserId = Guid.Parse(id), Email = email, HashedPassword = hPass, isAdmin = false, isBanned = false, Login = login }));

            }
        }

        [TestCase("31231234-1234-1242-1242-123412341234", null, null, null)]
        public void UserRepository_Create_ShouldThrow(string id, string email, string hPass, string login)
        {
            using (UserRepository db = new UserRepository(_context))
            {
                db.Create(new User { UserId = Guid.Parse(id), Email = "", HashedPassword = "", isAdmin = false, isBanned = false, Login = "" });
                Assert.Throws(typeof(Exception), () => db.Create(new User { UserId = Guid.Parse(id), Email = email, HashedPassword = hPass, isAdmin = false, isBanned = false, Login = login }));
            }
        }

        [TestCase("31231234-1234-1242-1242-123412341235", "as", "qe", "tr")]
        public void UserRepository_Update_ShouldNotThrow(string id, string email, string hPass, string login)
        {
            using (UserRepository db = new UserRepository(_context))
            {
                User user = new User { UserId = Guid.Parse(id), Email = "", HashedPassword = "", isAdmin = false, isBanned = false, Login = "" };
                db.Create(user);
                user.Login = "qweqweqsadd";
                Assert.DoesNotThrow(() => db.Update(user));
            }

        }

        [TestCase("31231234-1234-1242-1242-123412341234", "as", "qe", "tr")]
        public void UserRepository_Update_ShouldThrow(string id, string email, string hPass, string login)
        {
            using (UserRepository db = new UserRepository(_context))
            {
                Assert.Throws(typeof(Exception), () => db.Update(new User { UserId = Guid.Parse(id), Email = email, HashedPassword = hPass, isAdmin = false, isBanned = false, Login = login }));
            }

        }

        [TestCase("31231234-1234-1242-1242-123412341235")]
        public void UserRepository_Delete_ShouldNotThrow(string id)
        {
            using (UserRepository db = new UserRepository(_context))
            {
                User user = new User { UserId = Guid.Parse(id), Email = "", HashedPassword = "", isAdmin = false, isBanned = false, Login = "" };
                db.Create(user);
                Assert.DoesNotThrow(() => db.Delete(user.UserId));
            }
        }

        [TestCase("11111111-1111-1111-1111-111111111111")]
        public void UserRepository_Delete_ShouldThrow(string id)
        {
            using (UserRepository db = new UserRepository(_context))
            {
                Assert.Throws(typeof(Exception), () => db.Delete(Guid.Parse(id)));
            }
        }
    }
}