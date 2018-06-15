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

    }
}
