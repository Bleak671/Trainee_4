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
    public class AuthorWorksController : ControllerBase
    {
        private UserBLL _userDB;
        private PhotoBLL _photoDB;
        private PhotoCommentBLL _photoCommentDB;
        private PhotoReviewBLL _photoReviewDB;
        public AuthorWorksController(UserBLL userDB, PhotoBLL photoDB, PhotoCommentBLL photoCommentDB, PhotoReviewBLL photoReviewDB)
        {
            _userDB = userDB;
            _photoDB = photoDB;
            _photoCommentDB = photoCommentDB;
            _photoReviewDB = photoReviewDB;
        }
        // GET: AuthorWorksController
        [HttpGet]
        public IEnumerable<Photo> Get()
        {
            return _photoDB.GetAllPhotos();
        }

        // GET: AuthorWorksController/Details/5
        [HttpGet("{id}")]
        public Photo Get(string id)
        {
            return _photoDB.GetPhoto(id);
        }

        // POST: AuthorWorksController/Create
        [HttpPost]
        public void Post([FromBody] string value)
        {
            _photoDB.CreatePhoto(value);
        }

        // PUT: AuthorWorksController/Edit
        [HttpPut]
        public void Put([FromBody] string value)
        {
            _photoDB.UpdatePhoto(value);
        }
    }
}
