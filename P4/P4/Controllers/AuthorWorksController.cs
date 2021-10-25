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
    public class AuthorWorksController : Controller
    {
        // GET: AuthorWorksController
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        // GET: AuthorWorksController/Details/5
        [HttpGet("{id}")]
        public ActionResult Details(int id)
        {
            return View();
        }

        // POST: AuthorWorksController/Create
        [HttpPost]
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
    }
}
