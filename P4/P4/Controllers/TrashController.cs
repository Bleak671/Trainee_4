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
    public class TrashController : ControllerBase
    {
        private UserBLL _userBll;
        private PhotoBLL _photoBll;
        private PhotoCommentBLL _photoCommentBll;
        private PhotoReviewBLL _photoReviewBll;
        public TrashController(UserBLL userDB, PhotoBLL photoDB, PhotoCommentBLL photoCommentDB, PhotoReviewBLL photoReviewDB)
        {
            _userBll = userDB;
            _photoBll = photoDB;
            _photoCommentBll = photoCommentDB;
            _photoReviewBll = photoReviewDB;
        }
        // GET: TrashController
        [HttpGet]
        public IEnumerable<Photo> Get()
        {
            return _photoBll.GetAllPhotos();
        }

        // GET: TrashController/Details/5
        [HttpGet("{id}")]
        public Photo Details(string id)
        {
            return _photoBll.GetPhoto(Guid.Parse(id));
        }

        // PUT: TrashController/Edit/5
        [HttpPut]
        public void Put([FromBody] string value)
        {
            _photoBll.UpdatePhoto(JsonConvert.DeserializeObject<Photo>(value));
        }

        // DELETE: TrashController/Delete/5
        [HttpDelete("Delete/{id}")]
        public void Delete(string id)
        {
            _photoBll.DeletePhoto(Guid.Parse(id));
        }
    }
}
