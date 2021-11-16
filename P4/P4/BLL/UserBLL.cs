using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using P4.DAL;
using P4.JWT;
using P4.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace P4.BLL
{
    public class UserBLL : IDisposable
    {
        private IRepository<User> _userRepos;

        public UserBLL(IRepository<User> userRepos)
        {
            _userRepos = userRepos;
        }

        public void CreateUser(User user)
        {
            List<User> list = _userRepos.GetAll();
            foreach (User u in list)
            {
                if (u.Email == user.Email)
                    throw new Exception("Email exists");
            }
            _userRepos.Create(user);
        }

        public List<User> GetUsers()
        {
            return _userRepos.GetAll();
        }

        public User GetUser(Guid id)
        {
            return _userRepos.GetOne(id);
        }

        public void UpdateUser(User user)
        {
            List<User> list = _userRepos.GetAll();
            foreach (User u in list)
            {
                if (u.Login == user.Login)
                    throw new Exception("Nickname exists");
            }
            _userRepos.Update(user);
        }

        public void DeleteUser(Guid id)
        {
            _userRepos.Delete(id);
        }

        public void Dispose()
        {
            _userRepos.Dispose();
        }
    }
}
