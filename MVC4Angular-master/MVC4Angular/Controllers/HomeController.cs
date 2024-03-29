﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVC4Angular.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
           
            return View();
        }

        public ActionResult Logout()
        {
            if (Session["ConnectionId"] != null)
            {
                Session.Abandon();
            }
            return View();
        }

        [HttpGet]
        public void SaveConnectionId(string conn)
        {
            System.Web.HttpContext.Current.Session["ConnectionId"] = conn;
        }

        

    }
}
