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
    public class AuthorizationController : ControllerBase
    {
        private UserBLL _userDB;
        private PhotoBLL _photoDB;
        private PhotoCommentBLL _photoCommentDB;
        private PhotoReviewBLL _photoReviewDB;
        public AuthorizationController(UserBLL userDB, PhotoBLL photoDB, PhotoCommentBLL photoCommentDB, PhotoReviewBLL photoReviewDB)
        {
            _userDB = userDB;
            _photoDB = photoDB;
            _photoCommentDB = photoCommentDB;
            _photoReviewDB = photoReviewDB;
        }
        // GET: AuthController/Details/5
        [HttpGet("{id}")]
        public User Get(string id)
        {
            return _userDB.GetUser(id);
        }

        // POST: AuthController/Create
        [HttpPost]
        public void Post([FromBody] string value)
        {
            _userDB.CreateUser(value);
        }
    }
}
