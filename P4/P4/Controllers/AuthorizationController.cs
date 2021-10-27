using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using P4.BLL;
using P4.JWT;
using P4.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
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
        public AuthorizationController(UserBLL userDB, PhotoBLL photoDB, PhotoCommentBLL photoCommentDB, PhotoReviewBLL photoReviewDB)
        {
            _userBll = userDB;
            _photoBll = photoDB;
            _photoCommentBll = photoCommentDB;
            _photoReviewBll = photoReviewDB;
        }
        // GET: AuthController/asd
        [HttpGet("{username}")]
        public String Get(string username, [FromBody] string password)
        {
            var token = _userBll.GetJWT(username, password);
            if (token != null)
                return JsonConvert.SerializeObject(token);
            else
                return null;
        }

        // POST: AuthController/Create
        [HttpPost]
        public void Post([FromBody] string value)
        {
            _userBll.CreateUser(JsonConvert.DeserializeObject<User>(value));
        }
    }
}
