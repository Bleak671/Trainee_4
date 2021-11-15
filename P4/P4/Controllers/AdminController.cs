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
    [Authorize(Roles = "True")]
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private UserBLL _userBll;
        private PhotoBLL _photoBll;
        private PhotoCommentBLL _photoCommentBll;
        private PhotoReviewBLL _photoReviewBll;
        public AdminController(UserBLL userDB, PhotoBLL photoDB, PhotoCommentBLL photoCommentDB, PhotoReviewBLL photoReviewDB)
        {
            _userBll = userDB;
            _photoBll = photoDB;
            _photoCommentBll = photoCommentDB;
            _photoReviewBll = photoReviewDB;
        }
        // GET: Admin
        [HttpGet]
        public string Get() 
        {
            return JsonConvert.SerializeObject(_userBll.GetUsers());
        }

        [HttpGet("GetUser/{id}")]
        // GET: Admin/GetUser/5
        public string GetUser(string id)
        {
            return JsonConvert.SerializeObject(_userBll.GetUser(Guid.Parse(id)));
        }

        [HttpGet("GetPhoto/{id}")]
        // GET: Admin/GetPhoto/5
        public Photo GetPhoto(string id)
        {
            return _photoBll.GetPhoto(Guid.Parse(id));
        }


        // PUT: Admin/EditUser
        [HttpPut("EditUser")]
        public void PutUser([FromBody] JsonElement value)
        {
            _userBll.UpdateUser(JsonConvert.DeserializeObject<User>(value.ToString()));
        }

        // PUT: Admin/EditPhoto
        [HttpPut("EditPhoto")]
        public void PutPhoto([FromBody] JsonElement value)
        {
            _photoBll.UpdatePhoto(JsonConvert.DeserializeObject<Photo>(value.ToString()));
        }

        // DELETE: Admin/DeleteUser/5
        [HttpDelete("DeleteUser/{id}")]
        public void DeleteUser(string id)
        {
            _userBll.DeleteUser(Guid.Parse(id));
        }

        // DELETE: Admin/DeletePhoto/5
        [HttpDelete("DeletePhoto/{id}")]
        public void DeletePhoto(string id)
        {
            _photoBll.DeletePhoto(Guid.Parse(id));
        }
    }
}
