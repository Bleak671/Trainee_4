using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using P4.BLL;
using P4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace P4.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorAccountController : ControllerBase
    {
        private UserBLL _userBll;
        private PhotoBLL _photoBll;
        private PhotoCommentBLL _photoCommentBll;
        private PhotoReviewBLL _photoReviewBll;
        public AuthorAccountController(UserBLL userDB, PhotoBLL photoDB, PhotoCommentBLL photoCommentDB, PhotoReviewBLL photoReviewDB)
        {
            _userBll = userDB;
            _photoBll = photoDB;
            _photoCommentBll = photoCommentDB;
            _photoReviewBll = photoReviewDB;
        }
        // GET: AuthorAccount
        [HttpGet("{id}")]
        public ActionResult<User> Get(string id)
        {
            try
            {
                return Ok(_userBll.GetUser(Guid.Parse(id)));
            }
            catch
            {
                return BadRequest();
            }
        }

        // PUT: AuthorAccount/Edit
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] User user)
        {
            try
            {
                _userBll.UpdateUser(Guid.Parse(id), user);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        // Delete: AuthorAccount/Delete/5
        [HttpDelete("{id}")]
        public ActionResult Delete([FromRoute] string id)
        {
            try
            {
                _userBll.DeleteUser(Guid.Parse(id));
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
