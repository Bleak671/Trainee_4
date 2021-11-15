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
        public string Get()
        {
            return JsonConvert.SerializeObject(_photoBll.GetAllPhotos());
        }

        // GET: AuthorWorksController/5
        [HttpGet("{id}")]
        public string Get([FromRoute] string id)
        {
            return JsonConvert.SerializeObject(_photoBll.GetUsersPhotos(Guid.Parse(id)));
        }

        // POST: AuthorWorksController/Create
        [HttpPost]
        public void Post([FromBody] JsonElement value)
        {
            _photoBll.CreatePhoto(JsonConvert.DeserializeObject<Photo>(value.ToString()));
        }

        // PUT: AuthorWorksController/Edit
        [HttpPut]
        public void Put([FromBody] JsonElement value)
        {
            _photoBll.UpdatePhoto(JsonConvert.DeserializeObject<Photo>(value.ToString()));
        }
    }
}
