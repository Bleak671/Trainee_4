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
    public class TrashController : Controller
    {
        // GET: TrashController
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        // GET: TrashController/Details/5
        [HttpGet("{id}")]
        public ActionResult Details(int id)
        {
            return View();
        }

        // POST: TrashController/Edit/5
        [HttpPost("{id}")]
        public ActionResult Edit(int id, IFormCollection collection)
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

        // POST: TrashController/Delete/5
        [HttpPost("Delete/{id}")]
        public ActionResult Delete(int id, IFormCollection collection)
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
