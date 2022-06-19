using Microsoft.AspNetCore.Mvc;
using P4.BLL;
using P4.Models;
using P4.Utility;
using System;

namespace P4.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorizationController : ControllerBase
    {
        private UserBLL _userBll;
        private AuthUtility _authUtility;
        public AuthorizationController(UserBLL userDB, PhotoBLL photoDB, PhotoCommentBLL photoCommentDB, PhotoReviewBLL photoReviewDB, AuthUtility authUtility)
        {
            _userBll = userDB;
            _authUtility = authUtility;
        }
        // POST: AuthController/asd
        [HttpPost("{email}")]
        public ActionResult Get(string email, [FromBody] int password)
        {
            try {
                var token = _authUtility.GetJWT(email, password.ToString());
                if (token != null)
                    return Ok(token);
                else
                    return BadRequest();
            }
            catch(Exception e)
            {
                return StatusCode(500, "Unhandled error while authorization");
            }
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
                return StatusCode(500, "Unhandled error while authorization");
            }            
        }
    }
}
