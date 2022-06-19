using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using P4.BLL;
using P4.Models;
using System;
using System.Collections.Generic;

namespace P4.Controllers
{
    [Authorize(Roles = "True")]
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private UserBLL _userBll;
        private PhotoBLL _photoBll;
        public AdminController(UserBLL userDB, PhotoBLL photoDB/*, PhotoCommentBLL photoCommentDB, PhotoReviewBLL photoReviewDB*/)
        {
            _userBll = userDB;
            _photoBll = photoDB;
        }
        // GET: Admin
        [HttpGet]
        public ActionResult<List<User>> Get() 
        {
            try
            {
                return new ObjectResult(_userBll.GetUsers());
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("GetUser/{id}")]
        // GET: Admin/GetUser/5
        public ActionResult<User> GetUser(string id)
        {
            try
            {
                return new ObjectResult(_userBll.GetUser(Guid.Parse(id)));
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("GetPhoto/{id}")]
        // GET: Admin/GetPhoto/5
        public ActionResult<Photo> GetPhoto(string id)
        {
            try
            {
                return new ObjectResult(_photoBll.GetPhoto(Guid.Parse(id)));
            }
            catch
            {
                return BadRequest();
            }
        }


        // PUT: Admin/EditUser
        [HttpPut("EditUser/{id}")]
        public ActionResult PutUser(string id, [FromBody] User user)
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

        // PUT: Admin/EditPhoto
        [HttpPut("EditPhoto/{id}")]
        public ActionResult PutPhoto(string id, [FromBody] Photo photo)
        {
            try
            {
                _photoBll.UpdatePhoto(Guid.Parse(id), photo);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        // DELETE: Admin/DeleteUser/5
        [HttpDelete("DeleteUser/{id}")]
        public ActionResult DeleteUser(string id)
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

        // DELETE: Admin/DeletePhoto/5
        [HttpDelete("DeletePhoto/{id}")]
        public ActionResult DeletePhoto(string id)
        {
            try
            {
                _photoBll.DeletePhoto(Guid.Parse(id));
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
