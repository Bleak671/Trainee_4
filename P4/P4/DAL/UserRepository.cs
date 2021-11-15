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
    public class UserRepository : IRepository<User>
    {
        private AppDBContext db;
        public UserRepository(AppDBContext context)
        {
            db = context;
        }

        public void Create(User user)
        {
            int result = 1;
            try
            {
                if (user.UserId.ToString() == Guid.Empty.ToString())
                    user.UserId = Guid.NewGuid();
                if (user.Login == null)
                    user.Login = "";
                db.Users.Add(user);
                result = db.SaveChanges();
            }
            catch
            {
                throw new Exception("DB Error");
            }
            if (result != 1)
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
            int result = 1;
            try
            {
                db.Users.Update(user);
                result = db.SaveChanges();
            }
            catch
            {
                throw new Exception("DB Error");
            }
            if (result != 1)
            {
                throw new Exception("Can't Update");
            }
        }

        public void Delete(Guid id)
        {
            int result = 1;
            try
            {
                User usr = db.Users.FirstOrDefault(p => p.UserId == id);
                db.Users.Remove(usr);
                result = db.SaveChanges();
            }
            catch
            {
                throw new Exception("DB Error");
            }
            if (result != 1)
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
