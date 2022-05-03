using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using P4.BLL;
using P4.Models;
using System;
using System.Collections.Generic;

namespace P4.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TagController : ControllerBase
    {
        private UserBLL _userBll;
        private PhotoBLL _photoBll;
        private PhotoCommentBLL _photoCommentBll;
        private PhotoReviewBLL _photoReviewBll;
        private TagBLL _tagBLL;
        private PhotoTagBLL _photoTagBLL;
        public TagController(UserBLL userDB, PhotoBLL photoDB, PhotoCommentBLL photoCommentDB, PhotoReviewBLL photoReviewDB, TagBLL tagBLL, PhotoTagBLL photoTagBLL)
        {
            _userBll = userDB;
            _photoBll = photoDB;
            _photoCommentBll = photoCommentDB;
            _photoReviewBll = photoReviewDB;
            _tagBLL = tagBLL;
            _photoTagBLL = photoTagBLL;
        }
        // GET: Admin
        [HttpGet]
        public ActionResult<List<Tag>> Get(string id)
        {
            try
            {
                var list = _photoTagBLL.GetPhotoTags().FindAll(pt => pt.PhotoId.ToString() == id);
                var res = new List<Tag>();
                foreach(var v in list)
                {
                    res.Add(_tagBLL.GetTag(v.TagId));
                }
                return new ObjectResult(res);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("GetTag/{id}")]
        // GET: Admin/GetUser/5
        public ActionResult<Tag> GetTag(string id)
        {
            try
            {
                return new ObjectResult(_tagBLL.GetTag(Guid.Parse(id)));
            }
            catch
            {
                return BadRequest();
            }
        }

        // PUT: Admin/EditUser
        [HttpPut("EditTag/{id}")]
        public ActionResult PutTag(string id, [FromBody] Tag tag)
        {
            try
            {
                _tagBLL.UpdateTag(Guid.Parse(id), tag);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        // DELETE: Admin/DeleteUser/5
        [HttpDelete("DeleteTag/{id}")]
        public ActionResult DeleteTag(string id)
        {
            try
            {
                _tagBLL.DeleteTag(Guid.Parse(id));
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
