using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using P4.DAL;
using P4.Models;
using System;

namespace P4Tests
{
    public class UserRepositoryTests
    {
        AppDBContext _context;
        [SetUp]
        public void Setup()
        {
            var optionsBuilder = new DbContextOptionsBuilder<AppDBContext>();
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=P4;Trusted_Connection=True;");
            _context = new AppDBContext(optionsBuilder.Options);
        }

        [Test]
        public void Test1(Guid uId, string email, string hPass, string login)
        {
            using (UserRepository db = new UserRepository(_context))
            {
                db.Create(new User { UserId = uId, Email = email, HashedPassword = hPass, isAdmin = false, isBanned = false, Login = login });
            }
            Assert.Pass();
        }
    }
}