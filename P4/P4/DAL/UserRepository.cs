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

        public Guid Create(User user)
        {
            int result = 1;
            try
            {
                if (user.UserId.ToString() == Guid.Empty.ToString())
                    user.UserId = Guid.NewGuid();
                if (user.Login == null)
                    user.Login = "";
                var e = db.Users.Add(user);
                result = db.SaveChanges();
                return e.Entity.UserId;
            }
            catch
            {
                throw new Exception("DB Error");
            }
            if (result != 1)
            {
                throw new Exception("Can't Add");
            }
            return Guid.Empty;
        }

        public List<User> GetAll()
        {
            return db.Users.ToList<User>();
        }

        public User GetOne(Guid id)
        {
            return db.Users.FirstOrDefault(p => p.UserId == id);
        }

        public void Update(Guid id, User user)
        {
            int result = 1;
            try
            {
                var old = db.Users.FirstOrDefault(i => i.UserId == id);
                db.Entry(old).CurrentValues.SetValues(user);
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
                var tags = db.UserMessages.Where(pt => pt.ToUserId == usr.UserId);
                db.UserMessages.RemoveRange(tags);
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
