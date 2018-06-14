﻿using System;
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

        private String CalculatePriority(MainView_Result result)
        {
            if (result.SoldStatusName != null && result.OpportunityStatusName != null)
            {
                if (result.SoldStatusName.Trim() == "Yes" && result.OpportunityStatusName.Trim() != "Closed")
                {
                    return "High";
                }
            }
            if (result.OpportunityStatusName != null)
            {
                if (result.OpportunityStatusName == "Need Candidates" && result.NumberOfPositions!=null)
                {
                    if (result.NumberOfPositions == 1)
                    {
                        return ("Medium");
                    }
                    if (result.NumberOfPositions >= 2)
                    {
                        return "High";
                    }
                }
            }
            return "Low";
        }
        /*
         * Method for getting the data for the main view
         */
        [HttpGet]
        public JsonResult GetMainData()
        {
            try
            {
                //create the object to connect to the database
                Dev_ClientOpportunitiesEntities item = new Dev_ClientOpportunitiesEntities();
                //get the results
                ObjectResult<MainView_Result> results = item.MainView();
                var returner = new List<MainView_Result> { };
                //map it to a json object
                foreach (MainView_Result mvR in results)
                {
                    returner.Add(new MainView_Result
                    {
                        OpportunityName = mvR.OpportunityName,
                        AEName = mvR.AEName,
                        OpActive = mvR.OpActive,
                        ClientContact = mvR.ClientContact,
                        ClientName = mvR.ClientName,
                        ClientSubbusiness = mvR.ClientSubbusiness,
                        MaxConsultantGrade = mvR.MaxConsultantGrade,
                        ExpectedStartDate = mvR.ExpectedStartDate,
                        LastModified = mvR.LastModified,
                        NumberOfPositions = mvR.NumberOfPositions,
                        PracticeName = mvR.PracticeName,
                        ProposedCandidate = mvR.ProposedCandidate,
                        Rate = mvR.Rate,
                        Skillset = mvR.Skillset,
                        AcceptedCandidate = mvR.AcceptedCandidate,
                        ACTName = mvR.ACTName,
                        Duration = mvR.Duration,
                        HireCandidate = mvR.HireCandidate,
                        MinConsultantGrade = mvR.MinConsultantGrade,
                        OpportunityStatusName = mvR.OpportunityStatusName,
                        PositionNote = mvR.PositionNote,
                        RejectedCandidate = mvR.RejectedCandidate,
                        SActive = mvR.SActive,
                        UnitName = mvR.UnitName,
                        Priority = CalculatePriority(mvR)
                    });
                }
                return Json(returner, JsonRequestBehavior.AllowGet);
            }
            catch(Exception e)
            {
                Console.WriteLine("An error occured {0}", e);
                return null;
            }
        }
	}
}