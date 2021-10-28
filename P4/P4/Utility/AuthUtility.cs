using Microsoft.IdentityModel.Tokens;
using P4.DAL;
using P4.JWT;
using P4.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace P4.Utility
{
    public class AuthUtility : IDisposable
    {
        private IRepository<User> _userRep;
        public AuthUtility(IRepository<User> userRep)
        {
            _userRep = userRep;
        }

        public void Dispose()
        {
            _userRep.Dispose();
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

            return encodedJwt;
        }

        private ClaimsIdentity GetIdentity(string email, string password)
        {
            User user = _userRep.GetAll().FirstOrDefault(x => x.Email == email && x.HashedPassword == password);
            if (user != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.Login),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, user.isAdmin.ToString())
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            // no user found
            return null;
        }

    }
}
