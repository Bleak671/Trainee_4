using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using P4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace P4.DAL
{
    public class UserRepository : IRepository<User>, IDisposable
    {
        private AppDBContext db;
        public UserRepository(AppDBContext context)
        {
            db = context;
        }

        public void Create(User user)
        {
            db.Users.Add(user);
            if (db.SaveChanges() != 1)
            {
                throw new Exception("Can't Add");
            }
        }

        public List<User> GetAll()
        {
            return db.Users.ToList<User>();
        }

        public User GetOne(Guid id)
        {
            return db.Users.FirstOrDefault(p => p.UserId == id);
        }

        public void Update(User user)
        {
            db.Users.Update(user);
            if (db.SaveChanges() != 1)
            {
                throw new Exception("Can't Update");
            }
        }

        public void Delete(Guid id)
        {
            User result = db.Users.FirstOrDefault(p => p.UserId == id);
            db.Users.Remove(result);
            db.SaveChanges();
            if (db.SaveChanges() != 1)
            {
                throw new Exception("Can't Delete");
            }
        }

        public void Dispose()
        {
            db.Dispose();
        }
    }
}
