using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SogetiStaffingPlanner.Models;

namespace SogetiStaffingPlanner.Controllers
{
    public class OpportunityController : Controller
    {
		ClientOpportunitiesEntities db = new ClientOpportunitiesEntities();

		//Default Method to return the view of the Index
		public ViewResult Index()
		{
			return View();
		}

		/*
		 * GET: /Opportunity/GetClientList
		 * Returns a JSON list of partial ClientList Objects including ClientId, ClientName, and ClientSubbusiness.
		 */
		[HttpGet]
		public ActionResult GetClientList()
		{
			try
			{
				List<Client> clients = db.Clients.ToList<Client>();

				List<ClientList> clientList = new List<ClientList>();
				foreach (Client c in clients)
				{
					if (c.Active)
					{
						clientList.Add(new ClientList
						{
							ClientId = c.ClientId,
							ClientName = c.ClientName,
							ClientSubbusiness = c.ClientSubbusiness
						});
					}
				}
				return Json(clientList, JsonRequestBehavior.AllowGet);
			}
			catch (Exception e)
			{
				System.Diagnostics.Debug.WriteLine(e.ToString());
			}
			return Json("An Error Occurred", JsonRequestBehavior.AllowGet);
		}

		/*
		 * GET: /Opportunity/GetAEList
		 * Returns a JSON list of Active partial Users as AEList Objects including UserId as AEId and UserName as AEName.
		 */
		[HttpGet]
		public ActionResult GetAEList()
		{
			try
			{
				List<AEList> results = db.Database.SqlQuery<AEList>("GetAEList").ToList<AEList>();
				return Json(results, JsonRequestBehavior.AllowGet);
			}
			catch (Exception e)
			{
				System.Diagnostics.Debug.WriteLine(e.ToString());
			}
			return Json("An Error Occurred", JsonRequestBehavior.AllowGet);
		}


		/*
		 * GET: /Opportunity/GetACTLeadList
		 * Returns a JSON list of Active partial Users as ACTLeadList Objects including ACTLeadId, ACTLeadName.
		 */
		[HttpGet]
		public ActionResult GetACTLeadList()
		{
			try
			{
				List<ACTLeadList> results = db.Database.SqlQuery<ACTLeadList>("GetACTLeadList").ToList<ACTLeadList>();
				return Json(results, JsonRequestBehavior.AllowGet);
			}
			catch (Exception e)
			{
				System.Diagnostics.Debug.WriteLine(e.ToString());
			}
			return Json("An Error Occurred", JsonRequestBehavior.AllowGet);
		}


		/*
		 * GET: /Opportunity/GetSoldStatusList
		 * Returns a JSON list of Active SoldStatusList Objects including SoldStatusId and SoldStatusName
		 */
		[HttpGet]
		public ActionResult GetSoldStatusList()
		{
			try
			{
				List<SoldStatus> soldStatuses = db.SoldStatuses.ToList();

				List<SoldStatusList> statuses = new List<SoldStatusList>();
				foreach (SoldStatus ss in soldStatuses)
				{
					if (ss.Active)
					{
						statuses.Add(new SoldStatusList
						{
							SoldStatusId = ss.SoldStatusId,
							SoldStatusName = ss.SoldStatusName
						});
					}
				}
				return Json(statuses, JsonRequestBehavior.AllowGet);
			}
			catch (Exception e)
			{
				System.Diagnostics.Debug.WriteLine(e.ToString());
			}
			return Json("An Error Occurred", JsonRequestBehavior.AllowGet);
		}

		/*
		 * GET: /Opportunity/GetRegionList
		 * Returns a JSON list of RegionList Objects including RegionId and RegionName
		 */
		[HttpGet]
		public ActionResult GetRegionList()
		{
			try
			{
				List<Region> regions = db.Regions.ToList();

				List<RegionList> regionList = new List<RegionList>();
				foreach (Region r in regions)
				{
					if (r.Active)
					{
						regionList.Add(new RegionList
						{
							RegionId = r.RegionId,
							RegionName = r.RegionName
						});
					}
				}
				return Json(regionList, JsonRequestBehavior.AllowGet);
			}
			catch (Exception e)
			{
				System.Diagnostics.Debug.WriteLine(e.ToString());
			}
			return Json("An Error Occurred", JsonRequestBehavior.AllowGet);
		}

		/*
		 * GET: /Opportunity/GetUnitList
		 * Returns a JSON list of UnitList Objects including UnitId and UnitName
		 */
		[HttpGet]
		public ActionResult GetUnitList()
		{
			try
			{
				List<Unit> units = db.Units.ToList();

				List<UnitList> unitList = new List<UnitList>();
				foreach (Unit u in units)
				{
					if (u.Active)
					{
						unitList.Add(new UnitList
						{
							UnitId = u.UnitId,
							UnitName = u.UnitName
						});
					}
				}
				return Json(unitList, JsonRequestBehavior.AllowGet);
			}
			catch (Exception e)
			{
				System.Diagnostics.Debug.WriteLine(e.ToString());
			}
			return Json("An Error Occurred", JsonRequestBehavior.AllowGet);
		}

		/*
		* POST: Opportunity/AddOpportunity
		* Adds a new opportunity to the entity framework when called using HttpPost
		*/
		[HttpPost]
		public ActionResult AddOpportunity(int opportunityID, int clientID, int accountExecutiveUserId, int unitId, int regionId, int soldStatusId, string opportunityName, int opportunityOwnerUserId, string opportunityNotes, string clientContact, int lastModifiedUserId, DateTime lastModified, bool active)
		{
			try
			{
				Opportunity opportunity = new Opportunity()
				{
					OpportunityId = opportunityID,
					ClientId = clientID,
					AccountExecutiveUserId = accountExecutiveUserId,
					UnitId = unitId,
					RegionId = regionId,
					SoldStatusId = soldStatusId,
					OpportunityName = opportunityName,
					OpportunityOwnerUserId = opportunityOwnerUserId,
					OpportunityNotes = opportunityNotes,
					ClientContact = clientContact,
					LastModifiedUserId = lastModifiedUserId,
					LastModified = DateTime.Now,
					Active = true
				};

				db.Opportunities.Add(opportunity);
				db.SaveChanges();
			}
			catch (Exception e)
			{
				System.Diagnostics.Debug.WriteLine(e.ToString());
				return Json("An Error Occurred", JsonRequestBehavior.AllowGet);
			}
			return Json("Opportunity Added Successfully", JsonRequestBehavior.AllowGet);
		}
	}
}