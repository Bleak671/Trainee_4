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
            if (list.Any(x => x.Email == user.Email))
                throw new Exception("Email exists");
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

        public void UpdateUser(Guid id, User user)
        {
            List<User> list = _userRepos.GetAll();
            if (list.Any(x => x.Login == user.Login && x.UserId != id))
                throw new Exception("Nickname exists");
            _userRepos.Update(id, user);
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
