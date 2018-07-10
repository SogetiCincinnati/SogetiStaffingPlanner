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

        ClientOpportunitiesEntities db = new ClientOpportunitiesEntities();

		public ActionResult Index()
		{
			return View();
		}

		/*
         * Function that calculates the priority of an oppurtunity
         * Currently only using OpportunityStatus and the number of people to calculate it
        */
		private String CalculatePriority(PracticeManagerData result)
		{
			if (result.PositionStatusName != null)
			{
				if (result.PositionStatusName == "Need Candidates" && result.NumberOfPositions != null)
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
            //get the results
            try
            {
                List<PracticeManagerData> results = db.Database.SqlQuery<PracticeManagerData>("GetPracticeManagerReportData").ToList<PracticeManagerData>();
                var returner = new List<PracticeManagerData> { };
                //map it to a json object
				//TODO: Correct SQL stored procedure to include Active attribute, and only display active.
                foreach (PracticeManagerData mvR in results)
                {
                    returner.Add(new PracticeManagerData
                    {
                        OpportunityName = mvR.OpportunityName,
                        AEName = mvR.AEName,
                        OpActive = mvR.OpActive,
                        ClientContact = mvR.ClientContact,
                        ACT = mvR.ACT,
                        AE = mvR.AE,
                        ClientName = mvR.ClientName,
                        ClientSubbusiness = mvR.ClientSubbusiness,
                        MaxConsultantGrade = mvR.MaxConsultantGrade,
                        MaxConsultantGradeId = mvR.MaxConsultantGradeId,
                        ExpectedStartDate = mvR.ExpectedStartDate,
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
                        MinConsultantGradeId = mvR.MinConsultantGradeId,
                        PositionStatusName = mvR.PositionStatusName,
                      //  PositionNote = mvR.PositionNote,
                        RejectedCandidate = mvR.RejectedCandidate,
                        SActive = mvR.SActive,
                        UnitName = mvR.UnitName,
                        Priority = CalculatePriority(mvR),                    
                        ExpectedStartDateString =mvR.ExpectedStartDateString,
                        LastModified = mvR.LastModified,
                        SoldStatusName = mvR.SoldStatusName,
                        PositionName = mvR.PositionName 
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