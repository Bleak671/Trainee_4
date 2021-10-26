using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        private UserBLL _userDB;
        private PhotoBLL _photoDB;
        private PhotoCommentBLL _photoCommentDB;
        private PhotoReviewBLL _photoReviewDB;
        public AuthorAccountController(UserBLL userDB, PhotoBLL photoDB, PhotoCommentBLL photoCommentDB, PhotoReviewBLL photoReviewDB)
        {
            _userDB = userDB;
            _photoDB = photoDB;
            _photoCommentDB = photoCommentDB;
            _photoReviewDB = photoReviewDB;
        }
        // GET: AuthorAccount
        [HttpGet("{id}")]
        public User Get(string id)
        {
            return _userDB.GetUser(id);
        }

        // PUT: AuthorAccount/Edit
        [HttpPut]
        public void Put([FromBody] string value)
        {
            _userDB.UpdateUser(value);
        }

        // Delete: AuthorAccount/Delete/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            _userDB.DeleteUser(id);
        }
    }
}
