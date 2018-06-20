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
			ViewBag.Message = "Your application.";

			return View();
		}

		public ActionResult Contact()
		{
			ViewBag.Message = "Your contact page.";

			return View();
		}
        /*
         * Function that calculates the priority of an oppurtunity
         * Currently only using OpportunityStatus and the number of people to calculate it
        */
        private String CalculatePriority(MainViewData result)
        {
            /*
            if (result.SoldStatusName != null && result.OpportunityStatusName != null)
            {
                if (result.SoldStatusName.Trim() == "Yes" && result.OpportunityStatusName.Trim() != "Closed")
                {
                    return "High";
                }
            }
            */
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
            
            ClientOpportunitiesEntities item = new ClientOpportunitiesEntities();
            //create the object to connect to the database
            //Dev_ClientOpportunitiesEntities item = new Dev_ClientOpportunitiesEntities();
            //get the results
            try
            {
                List<MainViewData> results = item.Database.SqlQuery<MainViewData>("MainView2").ToList<MainViewData>();
                var returner = new List<MainViewData> { };
                //map it to a json object
                foreach (MainViewData mvR in results)
                {
                    returner.Add(new MainViewData
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

        [HttpPost]
        public ActionResult AddPosition(int positionId, int opportunityId, int unitPracticeId, int maxConsultantGradeId,
                                                int minConsultantGradeId, string positionName, int numberOfPositions,
                                                  string skillset, int rate, int expectedStartDate, int duration,
                                                  string hireCandidate, string proposedCandidate, string acceptedCandidate,
                                                  string rejectedCandidate, string positionNote,
                                                  int lastModifiedUserId, int lastModified, bool active)
        {

            ClientOpportunitiesEntities db = new ClientOpportunitiesEntities();
            System.Diagnostics.Debug.WriteLine("AddPosition function");

            try
            {

                Position position = new Position()
                {
                    PositionId = positionId,
                    OpportunityId = opportunityId,
                    UnitPracticeId = unitPracticeId,
                    MaxConsultantGradeId = maxConsultantGradeId,
                    MinConsultantGradeId = minConsultantGradeId,
                    PositionName = positionName,
                    NumberOfPositions = numberOfPositions,
                    Skillset = skillset,
                    Rate = rate,
                    ExpectedStartDate = DateTime.Now,
                    Duration = duration,
                    HireCandidate = hireCandidate,
                    ProposedCandidate = proposedCandidate,
                    AcceptedCandidate = acceptedCandidate,
                    RejectedCandidate = rejectedCandidate,
                    PositionNote = positionNote,
                    LastModifiedUserId = 1,
                    LastModified = DateTime.Now,
                    Active = true
                };

                db.Positions.Add(position);
                db.SaveChanges();
            }

            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e.ToString());
                return Json("Position Add Failed", JsonRequestBehavior.AllowGet);
            }

            return Json("Position Added Successfully", JsonRequestBehavior.AllowGet);





        }

    }
}