using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace P4.Controllers
{
    public class AdminController : Controller
    {
        // GET: AdminController
        [HttpGet("Admin/")]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet("Admin/GetUser/{id}")]
        // GET: AdminController/GetUser/5
        public ActionResult GetUser(int id)
        {
            return View();
        }

        [HttpGet("Admin/GetPhoto/{id}")]
        // GET: AdminController/GetPhoto/5
        public ActionResult GetPhoto(int id)
        {
            return View();
        }


        // POST: AdminController/EditUser/5
        [HttpPost("Admin/EditUser/{id}")]
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

        // POST: AdminController/EditPhoto/5
        [HttpPost("Admin/EditPhoto/{id}")]
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

        // POST: AdminController/BanUser/5
        [HttpPost("Admin/BanUser/{id}")]
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

        // POST: AdminController/BanPhoto/5
        [HttpPost("Admin/BanPhoto/{id}")]
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

        // POST: AdminController/DeleteUser/5
        [HttpPost("Admin/DeleteUser/{id}")]
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

        // POST: AdminController/DeletePhoto/5
        [HttpPost("Admin/DeletePhoto/{id}")]
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
