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

		/*
		 * GET: /Opportunity/GetClientList
		 * Returns a JSON list of ClientId, ClientName, and ClientSubbusiness.
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

		//[HttpGet]
		//public ActionResult GetAEList()
		//{
		//	try
		//	{
		//		List<User> users = db.Users.ToList<User>();

		//		List<AEList> aes = new List<AEList>();
		//		foreach (User u in users)
		//		{

		//		}
		//		return Json(aes, JsonRequestBehavior.AllowGet);
		//	}
		//	catch (Exception e)
		//	{
		//		System.Diagnostics.Debug.WriteLine(e.ToString());
		//	}
		//	return Json("An Error Occurred", JsonRequestBehavior.AllowGet);
		//}

		//[HttpGet]
		//public ActionResult GetACTLeadList();

		/*
		 * GET: /Opportunity/GetOpportunityStatusList
		 * Returns a JSON list of Active partial Opportunity Status Objects including OpportunityStatusId, OpportunityStatusName.
		 */
		[HttpGet]
		public ActionResult GetOpportunityStatusList()
		{
			try
			{
				List<OpportunityStatus> opportunityStatuses = db.OpportunityStatuses.ToList();

				List<OpportunityStatusList> statuses = new List<OpportunityStatusList>();
				foreach (OpportunityStatus os in opportunityStatuses)
				{
					if (os.Active)
					{
						statuses.Add(new OpportunityStatusList
						{
							OpportunityStatusId = os.OpportunityStatusId,
							OpportunityStatusName = os.OpportunityStatusName
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

		//[HttpGet]
		//public ActionResult getRegionList();

		//[HttpGet]
		//public ActionResult getUnitList();



	}
}