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

        Dev_ClientOpportunitiesEntities db = new Dev_ClientOpportunitiesEntities();

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
                        ACT = mvR.ACT == null ? 0 : mvR.ACT,
                        AE = mvR.AE == null ? 0 : mvR.AE,
                        OpActive = mvR.OpActive,
                        ClientContact = mvR.ClientContact,
                        ClientName = mvR.ClientName,
                        ClientSubbusiness = mvR.ClientSubbusiness,
                        MaxConsultantGrade = mvR.MaxConsultantGrade,
                        ExpectedStartDate = mvR.ExpectedStartDate,
                        LastModified = mvR.LastModified == null ? new DateTime(1000, 1, 1):(System.DateTime)mvR.LastModified,
                        NumberOfPositions = mvR.NumberOfPositions,
                        PracticeName = mvR.PracticeName,
                        ProposedCandidate = mvR.ProposedCandidate,
                        Rate = mvR.Rate == null ? 0 : mvR.Rate,
                        Skillset = mvR.Skillset,
                        AcceptedCandidate = mvR.AcceptedCandidate,
                        ACTName = mvR.ACTName,
                        Duration = mvR.Duration == null ? 0: mvR.Duration,
                        HireCandidate = mvR.HireCandidate,
                        MinConsultantGrade = mvR.MinConsultantGrade,
                        PositionStatusName = mvR.PositionStatusName,
                        PositionNote = mvR.PositionNote,
                        RejectedCandidate = mvR.RejectedCandidate,
                        SActive = mvR.SActive,
                        UnitName = mvR.UnitName,
                        Priority = CalculatePriority(mvR),
                        ExpectedStartDateString = Convert.ToString(mvR.ExpectedStartDate.Value.Month) + "/" + Convert.ToString(mvR.ExpectedStartDate.Value.Day) + "/" + Convert.ToString(mvR.ExpectedStartDate.Value.Year),
                        LastModifiedString = Convert.ToString(mvR.LastModified.Value.Month) + "/" + Convert.ToString(mvR.LastModified.Value.Day) + "/" + Convert.ToString(mvR.LastModified.Value.Year),
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