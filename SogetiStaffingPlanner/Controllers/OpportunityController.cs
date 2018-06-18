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
        // private ClientOpportunitiesEntities dbopp = new ClientOpportunitiesEntities();
        // Opp getOpp = new OpportunityController();


        //GET: Opportunity
        //public ViewResult Index()
        //{
        //    return View(dbopp.Opportunities.ToList());
        //}

        [HttpGet]

        public JsonResult getspOppoortunities()
        {
            //connect to database with an object
            ClientOpportunitiesEntities dbopp = new ClientOpportunitiesEntities();

            //fetch the results
            List<Opportunity> spOpp = new List<Opportunity>();
            spOpp = dbopp.Opportunities.ToList<Opportunity>();

            //mapping to json 
            var Oppor = new List<Opportunity> { };
            foreach (Opportunity Ind in spOpp)
            {
                Oppor.Add(new Opportunity
                {
                    OpportunityId = Ind.OpportunityId,
                    OpportunityName = Ind.OpportunityName,
                    OpportunityStatus = Ind.OpportunityStatus,
                });
            }
            return Json(Oppor, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public ActionResult SetthisOpportunity(int OpportunityID, int ClientID, string OpportunityName, string OpportunityNotes, string ClientContact)
        {
            //connect to database with an object
            ClientOpportunitiesEntities dbopp = new ClientOpportunitiesEntities();

            //set data into new opportunity
            Opportunity sOpp = new Opportunity();
            sOpp.OpportunityId = OpportunityID;
            sOpp.ClientId = ClientID;
            sOpp.OpportunityName = OpportunityName;
            sOpp.OpportunityNotes = OpportunityNotes;
            sOpp.ClientContact = ClientContact;

            //save new opportunity to db
            dbopp.Opportunities.Add(sOpp);
            dbopp.SaveChanges();

            return Json("Add Successful", JsonRequestBehavior.AllowGet);

            //Success and error messages to front end
            //if()
            //{
            //    //  Send "false"
            //    return Json(new { success = false, responseText = "Cannot create new Opportunity" }, JsonRequestBehavior.AllowGet);
            //}
            //else
            //{
            //    //  Send "success"
            //    return Json(new { success = true, responseText = "Added Opportunity succesfully" }, JsonRequestBehavior.AllowGet);
            //}
        }

    }
}
