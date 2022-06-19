using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using P4.BLL;
using P4.Models;
using System;

namespace P4.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorAccountController : ControllerBase
    {
        private UserBLL _userBll;
        public AuthorAccountController(UserBLL userDB, PhotoBLL photoDB, PhotoCommentBLL photoCommentDB, PhotoReviewBLL photoReviewDB)
        {
            _userBll = userDB;
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
