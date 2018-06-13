using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SogetiStaffingPlanner.Models;

namespace SogetiStaffingPlanner.Controllers
{
	public class HomeController : Controller
	{
        public ActionResult Index()
		{
			return View();
		}

		public ActionResult About()
		{
			ViewBag.Message = "Your application description page.";

			return View();
		}

		public ActionResult Contact()
		{
			ViewBag.Message = "Your contact page.";

			return View();
		}
        /*
         * Method for getting the data for the main view
         */
        [HttpGet]
        public JsonResult GetMainData()
        {
            //create the object to connect to the database
            Dev_ClientOpportunitiesEntities item = new Dev_ClientOpportunitiesEntities();
            //get the results
            ObjectResult<MainView_Result> results =item.MainView();
            var returner = new List<MainView_Result> { };
            //map it to a json object
            foreach (MainView_Result mvR in results)
            {
                returner.Add(new MainView_Result
                {
                    OpportunityName = mvR.OpportunityName,
                    AE = mvR.AE,
                    Active = mvR.Active,
                    ClientContact = mvR.ClientContact,
                    ClientName = mvR.ClientName,
                    ClientSubbusiness = mvR.ClientSubbusiness,
                    ConsultantGradeName = mvR.ConsultantGradeName,
                    ExpectedStartDate = mvR.ExpectedStartDate,
                    LastModified = mvR.LastModified,
                    NumberOfPositions = mvR.NumberOfPositions,
                    PracticeName = mvR.PracticeName,
                    ProposedCandidate = mvR.ProposedCandidate,
                    Rate = mvR.Rate,
                    Skillset = mvR.Skillset
                });
            }
            return Json(returner, JsonRequestBehavior.AllowGet);
        }
	}
}