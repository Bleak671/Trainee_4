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
    public class AdminController : Controller
    {
        // GET: Admin
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet("GetUser/{id}")]
        // GET: Admin/GetUser/5
        public ActionResult GetUser(int id)
        {
            return View();
        }

        [HttpGet("GetPhoto/{id}")]
        // GET: Admin/GetPhoto/5
        public ActionResult GetPhoto(int id)
        {
            return View();
        }


        // POST: Admin/EditUser/5
        [HttpPost("EditUser/{id}")]
        public ActionResult EditUser(int id)
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

        // POST: Admin/EditPhoto/5
        [HttpPost("EditPhoto/{id}")]
        public ActionResult EditPhoto(int id)
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

        // POST: Admin/BanUser/5
        [HttpPost("BanUser/{id}")]
        public ActionResult BanUser(int id, IFormCollection collection)
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

        // POST: Admin/BanPhoto/5
        [HttpPost("BanPhoto/{id}")]
        [ValidateAntiForgeryToken]
        public ActionResult BanPhoto(int id)
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

        // POST: Admin/DeleteUser/5
        [HttpPost("DeleteUser/{id}")]
        public ActionResult DeleteUser(int id)
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

        // POST: Admin/DeletePhoto/5
        [HttpPost("DeletePhoto/{id}")]
        public ActionResult DeletePhoto(int id)
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
