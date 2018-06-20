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
		//[HttpGet]
		//public ActionResult ClientDetails(int? id)
		//{



		//    if (id == null)
		//    {
		//        return new HttpStatusCodeResult(System.Net.HttpStatusCode.BadRequest);
		//    }
		//    Client client = db.Clients.Find(id);
		//    if (client == null)
		//    {
		//        return HttpNotFound();
		//    }
		//    return Json(client, JsonRequestBehavior.AllowGet);
		//}

		/*  public ActionResult Create()
		  {
			  return View();
		  } */

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