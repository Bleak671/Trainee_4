using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using P4.BLL;
using P4.JWT;
using P4.Models;
using P4.Utility;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;

namespace P4.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorizationController : ControllerBase
    {
        private UserBLL _userBll;
        private PhotoBLL _photoBll;
        private PhotoCommentBLL _photoCommentBll;
        private PhotoReviewBLL _photoReviewBll;
        private AuthUtility _authUtility;
        public AuthorizationController(UserBLL userDB, PhotoBLL photoDB, PhotoCommentBLL photoCommentDB, PhotoReviewBLL photoReviewDB, AuthUtility authUtility)
        {
            _userBll = userDB;
            _photoBll = photoDB;
            _photoCommentBll = photoCommentDB;
            _photoReviewBll = photoReviewDB;
            _authUtility = authUtility;
        }
        // POST: AuthController/asd
        [HttpPost("{email}")]
        public ActionResult Get(string email, [FromBody] int password)
        {
            var token = _authUtility.GetJWT(email, password.ToString());
            if (token != null)
                return Ok(token);
            else
                return BadRequest();
        }

        // POST: AuthController/Create
        [HttpPost]
        public ActionResult Post([FromBody] User user)
        {
            try
            {
                _userBll.CreateUser(user);
                var token = _authUtility.GetJWT(user.Email, user.HashedPassword);
                if (token != null)
                    return Ok(token);
                else
                    return BadRequest();
            }
            catch
            {
                return BadRequest();
            }            
        }
    }
}
