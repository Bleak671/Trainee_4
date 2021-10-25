using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace P4.Controllers
{
    public class AuthorAccountController : Controller
    {
        // GET: AuthorAccountController
        [HttpGet("AuthorAccount/")]
        public ActionResult Index()
        {
            return View();
        }

        // POST: AuthorAccountController/Edit/5
        [HttpPost("AuthorAccount/Edit/{id}")]
        public ActionResult Edit(int id)
        {
            return View();
        }

        // GET: AuthorAccountController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }
    }
}
