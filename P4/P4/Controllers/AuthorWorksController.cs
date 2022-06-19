using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using P4.BLL;
using P4.Models;
using System;
using System.Collections.Generic;
using System.Text.Json;

namespace P4.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorWorksController : ControllerBase
    {
        private PhotoBLL _photoBll;
        public AuthorWorksController(UserBLL userDB, PhotoBLL photoDB, PhotoCommentBLL photoCommentDB, PhotoReviewBLL photoReviewDB)
        {
            _photoBll = photoDB;
        }
        // GET: AuthorWorksController
        [HttpGet]
        public ActionResult<List<Photo>> Get()
        {
            try
            {
                return Ok(_photoBll.GetPublishedNotTrashPhotos());
            }
            catch
            {
                return BadRequest();
            }
        }

        // GET: AuthorWorksController/5
        [HttpGet("{id}")]
        public ActionResult<Photo> Get(string id)
        {
            try
            {
                return Ok(_photoBll.GetUsersPhotos(Guid.Parse(id)));
            }
            catch
            {
                return BadRequest();
            }
        }

        // POST: AuthorWorksController/Create
        [HttpPost]
        public ActionResult Post([FromBody] JsonElement value)
        {
            try
            {
                _photoBll.CreatePhoto(JsonConvert.DeserializeObject<Photo>(value.ToString()));
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        // PUT: AuthorWorksController/Edit
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] Photo photo)
        {
            try
            {
                _photoBll.UpdatePhoto(Guid.Parse(id), photo);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
