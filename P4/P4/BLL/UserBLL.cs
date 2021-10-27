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

        public object GetJWT(string email, string password)
        {
            var identity = GetIdentity(email, password);
            if (identity == null)
            {
                return null;
            }

            var now = DateTime.UtcNow;
            // create JWT
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                username = identity.Name
            };

            return response;
        }

        private ClaimsIdentity GetIdentity(string email, string password)
        {
            User user = _userRepos.GetAll().FirstOrDefault(x => x.Email == email && x.HashedPassword == password);
            if (user != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.Login)
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    null);
                return claimsIdentity;
            }

            // no user found
            return null;
        }

        public void Dispose()
        {
            _userRepos.Dispose();
        }
    }
}
