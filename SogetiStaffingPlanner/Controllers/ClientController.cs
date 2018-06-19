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

        ClientOpportunitiesEntities db = new ClientOpportunitiesEntities();

        //GET ALL CLIENTS INFO
      //  [HttpGet]
     /*   public ActionResult Index()
        {

            System.Diagnostics.Debug.WriteLine("CLIENT INDEX FUNCTION EXECUTED!!!!!!!!!@@@@@@");


            var clientDetails1 = from s in db.Clients
                                 select new Client
                                 {
                                     ClientId = s.ClientId,
                                     ClientName = s.ClientName,
                                     ClientSubbusiness = s.ClientSubbusiness,
                                     LastModifiedUserId = s.LastModifiedUserId,
                                     LastModified = s.LastModified,
                                     Active = s.Active,

                                 };
            return Json(clientDetails1, JsonRequestBehavior.AllowGet);

        } */




        // CLIENT INFO BY ID
        [HttpGet]
        public ActionResult ClientDetails(int? id)
        {



            if (id == null)
            {
                return new HttpStatusCodeResult(System.Net.HttpStatusCode.BadRequest);
            }
            Client client = db.Clients.Find(id);
            if (client == null)
            {
                return HttpNotFound();
            }
            return Json(client, JsonRequestBehavior.AllowGet);
        }
       
      /*  public ActionResult Create()
        {
            return View();
        } */

        [HttpPost]
        public ActionResult Create([Bind(Include = "ClientId, ClientName, ClientSubbusiness, LastModifiedUserId,LastModified, Active")] Client client) {

            if (ModelState.IsValid) {

                db.Clients.Add(client);
              //  db.CLIENT_DETAILS.Add(client);
                client.LastModified = DateTime.Now;
                db.SaveChanges();
            }
            return Json("Client Added Successfully", JsonRequestBehavior.AllowGet);


        }

        // [HttpPost]
        // [ValidateAntiForgeryToken]
        // public Nullable<int> LastModifiedUserId { get; set; }
        /*  public ActionResult Create([n(Include = "ClientId, ClientName, ClientSubbusiness,LastModifiedUser, LastModified, Active")] Client client {

              if (ModelState.IsValid) {

                  db.Clients.Add(client);
                  client.

              }

          }*/
    }

}