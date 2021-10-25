using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace P4.Controllers
{
    public class AuthorWorksController : Controller
    {
        // GET: AuthorWorksController
        [HttpGet("AuthorWorks/")]
        public ActionResult Index()
        {
            return View();
        }

        // GET: AuthorWorksController/Details/5
        [HttpGet("AuthorWorks/Details/{id}")]
        public ActionResult Details(int id)
        {
            return View();
        }

        // POST: AuthorWorksController/Create
        [HttpPost("AuthorWorks/Create")]
        public ActionResult Create(IFormCollection collection)
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

        // POST: AuthorWorksController/Edit/5
        [HttpPost("AuthorWorks/Edit/{id}")]
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

        // POST: AuthorWorksController/Delete/5
        [HttpPost("AuthorWorks/Delete/{id}")]
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
