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
        [HttpPost("{username}")]
        public IActionResult Get([FromRoute] string username, [FromBody] int password)
        {
            var token = _authUtility.GetJWT(username, password.ToString());
            if (token != null)
                return Ok(JsonConvert.SerializeObject(token));
            else
                return BadRequest();
        }

        // POST: AuthController/Create
        [HttpPost]
        public IActionResult Post([FromBody] JsonElement value)
        {
            try
            {
                var user = JsonConvert.DeserializeObject<User>(System.Text.Json.JsonSerializer.Serialize(value));
                _userBll.CreateUser(user);
                var token = _authUtility.GetJWT(user.Email, user.HashedPassword);
                if (token != null)
                    return Ok(JsonConvert.SerializeObject(token));
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
