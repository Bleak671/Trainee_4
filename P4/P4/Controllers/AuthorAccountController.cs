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
    public class AuthorAccountController : Controller
    {
        // GET: AuthorAccount
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        // POST: AuthorAccount/Edit/5
        [HttpPost("{id}")]
        public ActionResult Edit(int id)
        {
            return View();
        }

        // GET: AuthorAccount/Delete/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            return View();
        }
    }
}
