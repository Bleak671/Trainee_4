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
    [Authorize]
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
        [HttpGet("{id}")]
        public ActionResult<List<Photo>> Get(string id)
        {
            try
            {
                return new ObjectResult(_photoBll.GetUsersTrashPhotos(Guid.Parse(id)));
            }
            catch
            {
                return BadRequest();
            }
        }

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

        // PUT: TrashController/Edit/5
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

        // DELETE: TrashController/Delete/5
        [HttpDelete("Delete/{id}")]
        public ActionResult Delete(string id)
        {
            try
            {
                _photoBll.DeletePhoto(Guid.Parse(id));
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
