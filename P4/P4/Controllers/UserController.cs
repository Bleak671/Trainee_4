using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using P4.BLL;
using P4.Models;
using System;
using System.Collections.Generic;
using System.Text.Json;

namespace P4.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private UserBLL _userBll;
        private PhotoBLL _photoBll;
        private PhotoCommentBLL _photoCommentBll;
        private PhotoReviewBLL _photoReviewBll;
        private UserMessageBLL _userMessageBLL;
        public UserController(UserBLL userDB, PhotoBLL photoDB, PhotoCommentBLL photoCommentDB, PhotoReviewBLL photoReviewDB, UserMessageBLL userMessageBLL)
        {
            _userBll = userDB;
            _photoBll = photoDB;
            _photoCommentBll = photoCommentDB;
            _photoReviewBll = photoReviewDB;
            _userMessageBLL = userMessageBLL;
        }
        // GET: Admin
        [HttpGet]
        public ActionResult<List<UserMessage>> Get(string id1, string id2)
        {
            try
            {
                var res = _userMessageBLL.GetUserMessages(Guid.Parse(id1), Guid.Parse(id2));
                if (res == null)
                    res = new List<UserMessage>();
                return new ObjectResult(new
                {
                    messages = res,
                    user = _userBll.GetUser(Guid.Parse(id1))
                }); ;
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("GetMessage/{id}")]
        // GET: Admin/GetUser/5
        public ActionResult<UserMessage> GetMessage(string id)
        {
            try
            {
                return new ObjectResult(_userMessageBLL.GetUserMessage(Guid.Parse(id)));
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost("CreateMessage")]
        public ActionResult PostComment([FromBody] JsonElement value)
        {
            try
            {
                _userMessageBLL.CreateUserMessage(JsonConvert.DeserializeObject<UserMessage>(value.ToString()));
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        // PUT: Admin/EditUser
        [HttpPut("EditMessage/{id}")]
        public ActionResult PutMessage(string id, [FromBody] UserMessage userM)
        {
            try
            {
                _userMessageBLL.UpdateUserMessage(Guid.Parse(id), userM);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        // DELETE: Admin/DeleteUser/5
        [HttpDelete("DeleteMessage/{id}")]
        public ActionResult DeleteMessage(string id)
        {
            try
            {
                _userMessageBLL.DeleteUserMessage(Guid.Parse(id));
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
