using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using P4.BLL;
using P4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace P4.Controllers
{
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
        public User Get(string id)
        {
            return _userBll.GetUser(Guid.Parse(id));
        }

        // PUT: AuthorAccount/Edit
        [HttpPut]
        public void Put([FromBody] string value)
        {
            _userBll.UpdateUser(JsonConvert.DeserializeObject<User>(value));
        }

        // Delete: AuthorAccount/Delete/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            _userBll.DeleteUser(Guid.Parse(id));
        }
    }
}
