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
    public class HomeController : ControllerBase
    {
        private UserBLL _userDB;
        private PhotoBLL _photoDB;
        private PhotoCommentBLL _photoCommentDB;
        private PhotoReviewBLL _photoReviewDB;
        public HomeController(UserBLL userDB, PhotoBLL photoDB, PhotoCommentBLL photoCommentDB, PhotoReviewBLL photoReviewDB)
        {
            _userDB = userDB;
            _photoDB = photoDB;
            _photoCommentDB = photoCommentDB;
            _photoReviewDB = photoReviewDB;
        }
        // GET: HomeController
        [HttpGet]
        public IEnumerable<Photo> Get()
        {

            return _photoDB.GetAllPhotos();
        }

        // GET: HomeController/Details/5
        [HttpGet("{id}")]
        public Photo Get(string id)
        {
            return _photoDB.GetPhoto(id);
        }

        // POST: HomeController/CreateReview
        [HttpPost("CreateReview")]
        public void PostReview([FromBody] string value)
        {
            _photoReviewDB.CreatePhotoReview(value);
        }

        // POST: HomeController/CreateComment
        [HttpPost("CreateComment")]
        public void PostComment([FromBody] string value)
        {
            _photoCommentDB.CreatePhotoComment(value);
        }
    }
}
