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
        public string Get([FromRoute] string id)
        {
            return JsonConvert.SerializeObject(_photoBll.GetUsersTrashPhotos(Guid.Parse(id)));
        }

        // PUT: TrashController/Edit/5
        [HttpPut]
        public void Put([FromBody] JsonElement value)
        {
            _photoBll.UpdatePhoto(JsonConvert.DeserializeObject<Photo>(value.ToString()));
        }

        // DELETE: TrashController/Delete/5
        [HttpDelete("Delete/{id}")]
        public void Delete([FromRoute] string id)
        {
            _photoBll.DeletePhoto(Guid.Parse(id));
        }
    }
}
