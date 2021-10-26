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
    public class TrashController : ControllerBase
    {
        private UserBLL _userDB;
        private PhotoBLL _photoDB;
        private PhotoCommentBLL _photoCommentDB;
        private PhotoReviewBLL _photoReviewDB;
        public TrashController(UserBLL userDB, PhotoBLL photoDB, PhotoCommentBLL photoCommentDB, PhotoReviewBLL photoReviewDB)
        {
            _userDB = userDB;
            _photoDB = photoDB;
            _photoCommentDB = photoCommentDB;
            _photoReviewDB = photoReviewDB;
        }
        // GET: TrashController
        [HttpGet]
        public IEnumerable<Photo> Get()
        {
            return _photoDB.GetAllPhotos();
        }

        // GET: TrashController/Details/5
        [HttpGet("{id}")]
        public Photo Details(string id)
        {
            return _photoDB.GetPhoto(id);
        }

        // PUT: TrashController/Edit/5
        [HttpPut]
        public void Put([FromBody] string value)
        {
            _photoDB.UpdatePhoto(value);
        }

        // DELETE: TrashController/Delete/5
        [HttpDelete("Delete/{id}")]
        public void Delete(string id)
        {
            _photoDB.DeletePhoto(id);
        }
    }
}
