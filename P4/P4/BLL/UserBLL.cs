using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using P4.DAL;
using P4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace P4.BLL
{
    public class UserBLL
    {
        UserRepository db;

        public UserBLL(AppDBContext context)
        {
            db = new UserRepository(context);
        }

        public void CreateUser(string value)
        {
            User res = (User)JsonConvert.DeserializeObject(value);
            db.Create(res);
        }

        public IEnumerable<User> GetUsers()
        {
            return db.GetAll();
        }

        public User GetUser(string id)
        {
            return db.GetOne(Guid.Parse(id));
        }

        public void UpdateUser(string value)
        {
            User res = (User)JsonConvert.DeserializeObject(value);
            db.Update(res);
        }

        public void DeleteUser(string id)
        {
            db.Delete(Guid.Parse(id));
        }
    }
}
