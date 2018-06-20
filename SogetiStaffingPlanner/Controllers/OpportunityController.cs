using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using SogetiStaffingPlanner.Models;
using System.Web.Script.Serialization;


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
		 * POST: Opportunity/AddOpportunity
		 * Adds a new opportunity to the entity framework when called using HttpPost
		 */
		[HttpPost]
		public ActionResult AddOpportunity(int opportunityID, int clientID, int accountExecutiveUserId, int unitId, int regionId, int soldStatusId,  string opportunityName, int opportunityOwnerUserId, string opportunityNotes, string clientContact, int lastModifiedUserId, DateTime lastModified, bool active)
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

		//[HttpGet]
		//      public JsonResult getspOppoortunities()
		//      {
		//          //connect to database with an object
		//          ClientOpportunitiesEntities dbopp = new ClientOpportunitiesEntities();

		//          //fetch the results
		//          List<Opportunity> spOpp = new List<Opportunity>();
		//          spOpp = dbopp.Opportunities.ToList<Opportunity>();

		//          //mapping to json 
		//          var Oppor = new List<Opportunity> { };
		//          foreach (Opportunity Ind in spOpp)
		//          {
		//              Oppor.Add(new Opportunity
		//              {
		//                  OpportunityId = Ind.OpportunityId,
		//                  OpportunityName = Ind.OpportunityName,
		//                  OpportunityStatus = Ind.OpportunityStatus,
		//              });
		//          }
		//          return Json(Oppor, JsonRequestBehavior.AllowGet);
		//      }
	}
}
