using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SogetiStaffingPlanner.Models;
using System.Data.Entity;

namespace SogetiStaffingPlanner.Controllers
{
    public class ClientController : Controller
    {
        ClientOpportunitiesEntities db = new ClientOpportunitiesEntities();

        //Default Index View Method
        public ActionResult Index()
        {
            return View();
        }

		/*
		* GET: /Client/GetClients
		* Returns a Json Serialized List of Active Client information in the ClientData object.
		*/
		[HttpGet]
		public ActionResult GetClients()
		{
			System.Diagnostics.Debug.WriteLine("Get Client List");

			List<Client> clients = db.Database.SqlQuery<Client>("spGetClients").ToList<Client>();
			List<ClientData> clientList = new List<ClientData> { };

			foreach (Client c in clients)
			{
				if (c.Active)
				{
					ClientData clientData = new ClientData();
					clientData.ClientId = c.ClientId;
					clientData.ClientName = c.ClientName;
					clientData.ClientSubbusiness = c.ClientSubbusiness;
					clientData.LastModifiedUserId = c.LastModifiedUserId;
					User user = db.Users.Find(c.LastModifiedUserId);
					clientData.LastModifiedUserName = user.FullName;
					clientData.LastModified = c.LastModified;
					clientData.Active = c.Active;

					clientList.Add(clientData);
				}
			}
			return Json(clientList, JsonRequestBehavior.AllowGet);
		}

		/*
		* POST:
		* Adds a new client into the entity framwork using a Post call. Last Modified Date and Active are set in this method.
		*/
		[HttpPost]
        public ActionResult AddClient(string clientName, string clientSubbusiness, int? lastModifiedUserId, DateTime? lastModified, bool? active)
        {
            System.Diagnostics.Debug.WriteLine("CLIENT POST FUNCTION EXECUTED.");
            try
            {
                Client client = new Client()
                {
                    ClientName = clientName,
                    ClientSubbusiness = clientSubbusiness,
					//Hardcoding LastModifiedUserId until login/sessions get implemented
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

		/*
		* POST: /Client/EditClient
		* Gets edited client information, updates the item in the entity, and saves the changes
		*/
		[HttpPost]
		public ActionResult EditClient(int clientId, string clientName, string clientSubbusiness, bool active)
		{
			System.Diagnostics.Debug.WriteLine("Edit Client");
			Client client = db.Clients.Find(clientId);
			if (client != null)
			{
				client.ClientName = clientName;
				client.ClientSubbusiness = clientSubbusiness;
				//Hardcoding LastModifiedUserId until login/sessions get implemented
				client.LastModifiedUserId = 1;
				client.LastModified = DateTime.Now;
				client.Active = active;

				db.Entry(client).State = EntityState.Modified;
				db.SaveChanges();
				return Json("Client Edited Successfully", JsonRequestBehavior.AllowGet);
			}
			return Json("Error Occurred", JsonRequestBehavior.AllowGet);
		}

		/*
		* GET: /Client/GetUserList
		* Returns a JSON list of Active UnitList Objects including UnitId and UnitName
		*/
		[HttpGet]
		public ActionResult GetUserList()
		{
			try
			{
				List<User> users = db.Users.ToList();

				List<UserList> userList = new List<UserList>();
				foreach (User u in users)
				{
					if (u.Active)
					{
						userList.Add(new UserList
						{
							UserId = u.UserId,
							UserFullName = u.FullName
						});
					}
				}
				return Json(userList, JsonRequestBehavior.AllowGet);
			}
			catch (Exception e)
			{
				System.Diagnostics.Debug.WriteLine(e.ToString());
			}
			return Json("An Error Occurred", JsonRequestBehavior.AllowGet);
		}
	}
}