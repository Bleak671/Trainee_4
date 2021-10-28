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
