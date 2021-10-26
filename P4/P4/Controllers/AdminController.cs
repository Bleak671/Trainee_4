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
    public class AdminController : ControllerBase
    {
        private UserBLL _userDB;
        private PhotoBLL _photoDB;
        private PhotoCommentBLL _photoCommentDB;
        private PhotoReviewBLL _photoReviewDB;
        public AdminController(UserBLL userDB, PhotoBLL photoDB, PhotoCommentBLL photoCommentDB, PhotoReviewBLL photoReviewDB)
        {
            _userDB = userDB;
            _photoDB = photoDB;
            _photoCommentDB = photoCommentDB;
            _photoReviewDB = photoReviewDB;
        }
        // GET: Admin
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return _userDB.GetUsers();
        }

        [HttpGet("GetUser/{id}")]
        // GET: Admin/GetUser/5
        public User GetUser(string id)
        {
            return _userDB.GetUser(id);
        }

        [HttpGet("GetPhoto/{id}")]
        // GET: Admin/GetPhoto/5
        public Photo GetPhoto(string id)
        {
            return _photoDB.GetPhoto(id);
        }


        // PUT: Admin/EditUser
        [HttpPut("EditUser")]
        public void PutUser([FromBody] string value)
        {
            _userDB.UpdateUser(value);
        }

        // PUT: Admin/EditPhoto
        [HttpPut("EditPhoto")]
        public void PutPhoto([FromBody] string value)
        {
            _photoDB.UpdatePhoto(value);
        }

        // DELETE: Admin/DeleteUser/5
        [HttpDelete("DeleteUser/{id}")]
        public void DeleteUser(string id)
        {
            _userDB.DeleteUser(id);
        }

        // DELETE: Admin/DeletePhoto/5
        [HttpDelete("DeletePhoto/{id}")]
        public void DeletePhoto(string id)
        {
            _photoDB.DeletePhoto(id);
        }
    }
}
