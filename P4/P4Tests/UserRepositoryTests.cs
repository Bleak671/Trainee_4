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
            .UseInMemoryDatabase(databaseName: "Test")
            .Options;
            _context = new AppDBContext(options);
        }

        [TestCase(null,null,null,null)]
        [TestCase("31231234-1234-1242-1242-123412341234", "asd", "qwe", "tre")]
        public void TestAddUser(Guid uId, string email, string hPass, string login)
        {
            using (UserRepository db = new UserRepository(_context))
            {
                
                db.Create(new User { UserId = uId, Email = email, HashedPassword = hPass, isAdmin = false, isBanned = false, Login = login });
            }
            Assert.Pass();
        }

        [TestCase(null)]
        [TestCase("31231234-1234-1242-1242-123412341234")]
        public void TestDeleteUser(Guid uId)
        {
            using (UserRepository db = new UserRepository(_context))
            {

                db.Delete(uId);
            }
            Assert.Pass();
        }

        [TestCase(null, null, null, null)]
        [TestCase("31231234-1234-1242-1242-123412341234", "asd", "qwe", "tre")]
        public void TestUpdateUser(Guid uId, string email, string hPass, string login)
        {
            using (UserRepository db = new UserRepository(_context))
            {

                db.Update(new User { UserId = uId, Email = email, HashedPassword = hPass, isAdmin = false, isBanned = false, Login = login });
            }
            Assert.Pass();
        }
    }
}