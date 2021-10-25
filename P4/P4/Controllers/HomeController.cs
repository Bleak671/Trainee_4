using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace P4.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : Controller
    {
        // GET: HomeController
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        // GET: HomeController/Details/5
        [HttpGet("{id}")]
        public ActionResult Details(int id)
        {
            return View();
        }

        // POST: HomeController/CreateReview
        [HttpPost("CreateReview")]
        public ActionResult CreateReview(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // POST: HomeController/CreateComment
        [HttpPost("CreateComment")]
        public ActionResult CreateComment(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
