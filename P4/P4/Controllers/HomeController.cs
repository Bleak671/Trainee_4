using Microsoft.AspNetCore.Cors;
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
    public class HomeController : ControllerBase
    {
        private UserBLL _userBll;
        private PhotoBLL _photoBll;
        private PhotoCommentBLL _photoCommentBll;
        private PhotoReviewBLL _photoReviewBll;
        public HomeController(UserBLL userDB, PhotoBLL photoDB, PhotoCommentBLL photoCommentDB, PhotoReviewBLL photoReviewDB)
        {
            _userBll = userDB;
            _photoBll = photoDB;
            _photoCommentBll = photoCommentDB;
            _photoReviewBll = photoReviewDB;
        }
        // GET: HomeController
        [HttpGet]
        public string Get()
        {
            return JsonConvert.SerializeObject(_photoBll.GetAllPhotos());
        }

        // GET: api/Home/5
        [HttpGet("{id}")]
        public string Get([FromRoute] string id)
        {
            return JsonConvert.SerializeObject(_photoBll.GetPhoto(Guid.Parse(id)));
        }

        // POST: HomeController/CreateReview
        [HttpPost("CreateReview")]
        public void PostReview([FromBody] string value)
        {
            _photoReviewBll.CreatePhotoReview(JsonConvert.DeserializeObject<PhotoReview>(value));
        }

        // POST: HomeController/CreateComment
        [HttpPost("CreateComment")]
        public void PostComment([FromBody] string value)
        {
            _photoCommentBll.CreatePhotoComment(JsonConvert.DeserializeObject<PhotoComment>(value));
        }
    }
}
