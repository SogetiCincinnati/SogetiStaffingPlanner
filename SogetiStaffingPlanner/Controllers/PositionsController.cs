
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SogetiStaffingPlanner.Models;


namespace SogetiStaffingPlanner.Controllers
{
    public class PositionsController : Controller
    {

        ClientOpportunitiesEntities db = new ClientOpportunitiesEntities();
        public ActionResult Index()
        {
            System.Diagnostics.Debug.WriteLine("/posiitons/index.cshtml called.");
            return View();
        }

        /*
         * Method for getting the data for the Positions
         */
        [HttpGet]
        public ActionResult GetPosition()
        {
            System.Diagnostics.Debug.WriteLine("/positions GET called.");
            List<Position> position = db.Database.SqlQuery<Position>("spPosition").ToList<Position>();
            var returnPositions = new List<Position> { };
            foreach (Position s in position)
            {
                returnPositions.Add(new Position
                {
                    PositionId = s.PositionId,
                    OpportunityId = s.OpportunityId,
                    UnitPracticeId = s.UnitPracticeId,
                    MaxConsultantGradeId = s.MaxConsultantGradeId,
                    MinConsultantGradeId = s.MinConsultantGradeId,
                    PositionName = s.PositionName,
                    NumberOfPositions = s.NumberOfPositions,
                    Skillset = s.Skillset,
                    Rate = s.Rate,
                    ExpectedStartDate = s.ExpectedStartDate,
                    Duration = s.Duration,
                    HireCandidate = s.HireCandidate,
                    ProposedCandidate = s.ProposedCandidate,
                    AcceptedCandidate = s.AcceptedCandidate,
                    RejectedCandidate = s.RejectedCandidate,
                    PositionNote = s.PositionNote,
                  //  PositionStatusId = s.PositionStatusId,
                    Active = true





                });




            }
            return Json(returnPositions, JsonRequestBehavior.AllowGet);
        }
            /*
         * Method for adding  the data for the Positions
         */
        [HttpPost]
        public ActionResult AddPosition(int positionId, int opportunityId, int unitPracticeId, int maxConsultantGradeId,
                                        int minConsultantGradeId, string positionName, int numberOfPositions,
                                          string skillset, int rate, int expectedStartDate, int duration,
                                          string hireCandidate, string proposedCandidate, string acceptedCandidate,
                                          string rejectedCandidate, string positionNote,
                                          int lastModifiedUserId, int lastModified, bool active)
        {

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
