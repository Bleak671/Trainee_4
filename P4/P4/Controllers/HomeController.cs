﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace P4.Controllers
{
    public class HomeController : Controller
    {
        // GET: HomeController
        [HttpGet("Home")]
        public ActionResult Index()
        {
            return View();
        }

        // GET: HomeController/Details/5
        [HttpGet("Home/GetPhotos/{id}")]
        public ActionResult Details(int id)
        {
            return View();
        }

        // POST: HomeController/CreateReview
        [HttpPost("Home/CreateReview")]
        [ValidateAntiForgeryToken]
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
        [HttpPost("Home/CreateComment")]
        [ValidateAntiForgeryToken]
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
