using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using P4.BLL;
using P4.Models;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using System.Text.Json;

namespace P4.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        private PhotoBLL _photoBll;
        private PhotoCommentBLL _photoCommentBll;
        private PhotoReviewBLL _photoReviewBll;
        private PhotoTagBLL _photoTagBLL;
        private TagBLL _tagBLL;
        public HomeController(UserBLL userDB, PhotoBLL photoDB, PhotoCommentBLL photoCommentDB, PhotoReviewBLL photoReviewDB, PhotoTagBLL photoTagBLL, TagBLL tagBLL)
        {
            _photoBll = photoDB;
            _photoCommentBll = photoCommentDB;
            _photoReviewBll = photoReviewDB;
            _photoTagBLL = photoTagBLL;
            _tagBLL = tagBLL;
        }
        // GET: HomeController
        [HttpGet]
        public ActionResult<List<Photo>> Get()
        {
            try
            {
                return new ObjectResult(_photoBll.GetPublishedNotTrashPhotos());
            }
            catch
            {
                return BadRequest();
            }
        }

        // GET: api/Home/5
        [HttpGet("{id}")]
        public ActionResult<object> Get(string id)
        {
            try
            {
                var photo = _photoBll.GetPhoto(Guid.Parse(id));
                var comments = _photoReviewBll.GetPhotosReviews(photo.PhotoId);
                var list = _photoTagBLL.GetPhotoTags().FindAll(pt => pt.PhotoId.ToString() == id);
                var res = new List<Tag>();
                foreach (var v in list)
                {
                    res.Add(_tagBLL.GetTag(v.TagId));
                }
                return new ObjectResult(new
                {
                    photo = photo,
                    comments = _photoCommentBll.GetPhotosComments(photo.PhotoId),
                    positive = comments.FindAll(c => c.isPositive == true).Count,
                    negative = comments.FindAll(c => c.isPositive == false).Count,
                    user = photo.User,
                    tags = res
                }) ;
            }
            catch (Exception E)
            {
                return BadRequest();
            }
        }

        [Authorize]
        // POST: HomeController/CreateReview
        [HttpPost("CreateReview")]
        public ActionResult PostReview([FromBody] JsonElement value)
        {
            try
            {
                _photoReviewBll.CreatePhotoReview(JsonConvert.DeserializeObject<PhotoReview>(value.ToString()));
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [Authorize]
        // POST: HomeController/CreateComment
        [HttpPost("CreateComment")]
        public ActionResult PostComment([FromBody] JsonElement value)
        {
            try
            {
                _photoCommentBll.CreatePhotoComment(JsonConvert.DeserializeObject<PhotoComment>(value.ToString()));
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
