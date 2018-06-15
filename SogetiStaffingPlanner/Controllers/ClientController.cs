using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SogetiStaffingPlanner.Models;

namespace SogetiStaffingPlanner.Controllers
{
    public class ClientController : Controller
    {
        //  private Dev_ClientOpportunitesEntites dbo = new ClientOpportunitesEntites();

        private ClientOpportunitiesEntities db = new ClientOpportunitiesEntities();

        public ActionResult ClientDetails() {

         
           var clientInfo = db.Clients;
            return View(clientInfo);
        }

        // GET: Clients
        // [Route("getAllClients")]

        //  [HttpPost]

        /*  public ActionResult AddClient(String name, String age)
          {
              //var clientsIngo = db.Clients.ToList();
              //var clientsInfo = db.Clients.Include()
              //return View(clinetsInfo.ToList());
              System.Diagnostics.Debug.WriteLine(name + " : " + age);
              return Json("Data send successfully");

          }*/
    }
}