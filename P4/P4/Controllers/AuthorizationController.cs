﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace P4.Controllers
{
    public class AuthorizationController : Controller
    {
        // GET: AuthController
        [HttpGet("Authorization/")]
        public ActionResult Index()
        {
            return View();
        }

        // GET: AuthController/Details/5
        [HttpGet("Authorization/Details/{id}")]
        public ActionResult Details(int id)
        {
            return View();
        }

        // POST: AuthController/Create
        [HttpPost("Authorization/Create")]
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
    }
}
