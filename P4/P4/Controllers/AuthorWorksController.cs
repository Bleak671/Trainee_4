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
    public class AuthorWorksController : ControllerBase
    {
        private UserBLL _userBll;
        private PhotoBLL _photoBll;
        private PhotoCommentBLL _photoCommentBll;
        private PhotoReviewBLL _photoReviewBll;
        public AuthorWorksController(UserBLL userDB, PhotoBLL photoDB, PhotoCommentBLL photoCommentDB, PhotoReviewBLL photoReviewDB)
        {
            _userBll = userDB;
            _photoBll = photoDB;
            _photoCommentBll = photoCommentDB;
            _photoReviewBll = photoReviewDB;
        }
        // GET: AuthorWorksController
        [HttpGet]
        public IEnumerable<Photo> Get()
        {
            return _photoBll.GetAllPhotos();
        }

        // GET: AuthorWorksController/Details/5
        [HttpGet("{id}")]
        public Photo Get(string id)
        {
            return _photoBll.GetPhoto(Guid.Parse(id));
        }

        // POST: AuthorWorksController/Create
        [HttpPost]
        public void Post([FromBody] string value)
        {
            _photoBll.CreatePhoto(JsonConvert.DeserializeObject<Photo>(value));
        }

        // PUT: AuthorWorksController/Edit
        [HttpPut]
        public void Put([FromBody] string value)
        {
            _photoBll.UpdatePhoto(JsonConvert.DeserializeObject<Photo>(value));
        }
    }
}
