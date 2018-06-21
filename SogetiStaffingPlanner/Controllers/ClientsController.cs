using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SogetiStaffingPlanner.Models;

namespace SogetiStaffingPlanner.Controllers
{
    public class ClientsController : Controller
    {
        ClientOpportunitiesEntities db = new ClientOpportunitiesEntities();

        //Get: Clients/Create
        public ActionResult Create()
        {
            return View();
        }

        /*
		* POST: /Client/AddClient
		* Adds a client into the entity framwork using a Post call. Last Modified Date and Active are set in this method.
		*/
        [HttpPost]
        public ActionResult AddClient(string clientName, string clientSubbusiness, int? lastModifiedUserId, DateTime? lastModified, bool? active)
        {
            System.Diagnostics.Debug.WriteLine("AddClient function");

            try
            {
                Client client = new Client()
                {

                    ClientName = clientName,
                    ClientSubbusiness = clientSubbusiness,
                    LastModifiedUserId = 1,
                    LastModified = DateTime.Now,
                    Active = true
                };
                db.Clients.Add(client);
                db.SaveChanges();
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e.ToString());
                return Json("Client Add Failed", JsonRequestBehavior.AllowGet);
            }
            return Json("Client Added Successfully", JsonRequestBehavior.AllowGet);
        }


        //GET ALL CLIENTS INFO
        [HttpGet]
        public ActionResult GetClients()
        {

            List<Client> results = db.Database.SqlQuery<Client>("spGetClients").ToList<Client>();
            var returner1 = new List<Client> { };
            System.Diagnostics.Debug.WriteLine("CLIENT INDEX FUNCTION EXECUTED!!!!!!!!!@@@@@@");

            foreach (Client s in results)
            {

                returner1.Add(new Client
                {
                    ClientId = s.ClientId,
                    ClientName = s.ClientName,
                    ClientSubbusiness = s.ClientSubbusiness,
                    LastModifiedUserId = s.LastModifiedUserId,
                    LastModified = s.LastModified,
                    Active = s.Active,



                });





            }

            return Json(returner1, JsonRequestBehavior.AllowGet);

        }






    }

}