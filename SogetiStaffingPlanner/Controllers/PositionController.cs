using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SogetiStaffingPlanner.Models;
using System.Data.Entity;


namespace SogetiStaffingPlanner.Controllers
{
	public class PositionController : Controller
	{

        ClientOpportunitiesEntities db = new ClientOpportunitiesEntities();

        public ActionResult Index()
        {
            System.Diagnostics.Debug.WriteLine("/posiitons/index.cshtml called.");
            return View();
        }

		/*
		* GET: /Position/GetPosition
		* A method to return a serialized list of Positions that are active.
		*/
		[HttpGet]
		public ActionResult GetPosition()
		{
			System.Diagnostics.Debug.WriteLine("Get Posistion called.");
			try
			{
				List<Position> positions = db.Positions.ToList<Position>();
				List<PositionData> positionList = new List<PositionData> { };
				foreach (Position p in positions)
				{
					
                        positionList.Add(new PositionData
                        {
                            PositionId = p.PositionId,
							OpportunityId = p.OpportunityId,
							UnitPracticeId = p.UnitPracticeId,
							MaxConsultantGradeId = p.MaxConsultantGradeId == null ? 0 : (int)p.MaxConsultantGradeId,
							MinConsultantGradeId = p.MinConsultantGradeId == null ? 0 : (int) p.MinConsultantGradeId,
							LastModifiedUserId = (int)p.LastModifiedUserId,
							PositionStatusId = p.PositionStatusId,
							PositionName = p.PositionName,
							NumberOfPositions = p.NumberOfPositions,
							Skillset = p.Skillset,
							Rate = p.Rate == null ? 0 : (int)p.Rate,
							ExpectedStartDate = p.ExpectedStartDate == null ? new DateTime(1000, 1, 1) : (System.DateTime)p.ExpectedStartDate,
							Duration = p.Duration == null ? 0 : (int)p.Duration,
							HireCandidate = p.HireCandidate,
							ProposedCandidate = p.ProposedCandidate,
							AcceptedCandidate = p.AcceptedCandidate,
							RejectedCandidate = p.RejectedCandidate,
							PositionNote = p.PositionNote,
							LastModified = p.LastModified,
							Active = p.Active
						});
					
				}
				return Json(positionList, JsonRequestBehavior.AllowGet);
			}
			catch (Exception e)
			{
				System.Diagnostics.Debug.WriteLine(e.ToString());
			}
			return Json("An Error Occurred", JsonRequestBehavior.AllowGet);
		}

		/*
		* Method for adding  the data for the Positions
		*/
		[HttpPost]
		public ActionResult AddPosition(int opportunityId, int unitPracticeId, int? maxConsultantGradeId,
										int? minConsultantGradeId, string positionName, int numberOfPositions,
										  string skillset, int rate, DateTime? expectedStartDate, int? duration,
										  string hireCandidate, string proposedCandidate, string acceptedCandidate,
										  string rejectedCandidate, string positionNote,
										  int lastModifiedUserId, DateTime lastModified, bool? active, int positionStatusId)
		{

			System.Diagnostics.Debug.WriteLine("Positions Controller: AddPosition function");
			try
			{
				Position position = new Position()
				{
					OpportunityId = opportunityId,
					UnitPracticeId = unitPracticeId,
					MaxConsultantGradeId = maxConsultantGradeId,
					MinConsultantGradeId = minConsultantGradeId,
					PositionName = positionName,
					NumberOfPositions = numberOfPositions,
					Skillset = skillset,
					Rate = rate,
					ExpectedStartDate = expectedStartDate,
					Duration = duration,
					HireCandidate = hireCandidate,
					ProposedCandidate = proposedCandidate,
					AcceptedCandidate = acceptedCandidate,
					RejectedCandidate = rejectedCandidate,
					PositionNote = positionNote,
					//Hardcoding in Last Modified User Id until this value can be pulled from session
					LastModifiedUserId = 1,
					LastModified = DateTime.Now,
					Active = true,
					PositionStatusId = positionStatusId
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

		/*
		* POST: /Position/EditPosition
		* Gets the information from the edited Position and saves any changes made to the entity framework
		*/
		[HttpPost]
		public ActionResult EditPosition(int positionId, int opportunityId, int unitPracticeId, int? maxConsultantGradeId, int? minConsultantGradeId, 
										string positionName, int numberOfPositions, string skillset, int rate, DateTime? expectedStartDate, 
										int? duration, string hireCandidate, string proposedCandidate, string acceptedCandidate, string rejectedCandidate,
										string positionNote, bool active, int positionStatusId)
		{
			System.Diagnostics.Debug.WriteLine("Edit Position Called");
			Position position = db.Positions.Find(positionId);
			if (position != null)
			{
				position.PositionId = positionId;
				position.OpportunityId = opportunityId;
				position.UnitPracticeId = unitPracticeId;
				position.MaxConsultantGradeId = maxConsultantGradeId == 0 ? position.MaxConsultantGradeId = null : position.MaxConsultantGradeId = maxConsultantGradeId;
				position.MinConsultantGradeId = minConsultantGradeId == 0 ? position.MinConsultantGradeId = null : position.MinConsultantGradeId = minConsultantGradeId;
                position.PositionName = positionName;
				position.NumberOfPositions = numberOfPositions;
				position.Skillset = skillset;
				position.Rate = rate;
				position.ExpectedStartDate = expectedStartDate;
				position.Duration = duration;
				position.HireCandidate = hireCandidate;
				position.ProposedCandidate = proposedCandidate;
				position.AcceptedCandidate = acceptedCandidate;
				position.RejectedCandidate = rejectedCandidate;
				position.PositionNote = positionNote;
				//Hardcoding User until this can be pulled from session
				position.LastModifiedUserId = 1;
				position.LastModified = DateTime.Now;
				position.Active = active;
				position.PositionStatusId = positionStatusId;

				db.Entry(position).State = EntityState.Modified;
				db.SaveChanges();
				return Json("Position Edited Successfully", JsonRequestBehavior.AllowGet);
			}
			return Json("Error Occurred", JsonRequestBehavior.AllowGet);
		}

		/*
		 * GET: /Position/GetUnitList
		 * Returns a JSON list of UnitList Objects including UnitId and UnitName
		 */
		[HttpGet]
		public ActionResult GetUnitList()
		{
			try
			{
				List<Unit> units = db.Units.ToList();

				List<UnitList> unitList = new List<UnitList>();
				foreach (Unit u in units)
				{
					if (u.Active == true)
					{
						unitList.Add(new UnitList
						{
							UnitId = u.UnitId,
							UnitName = u.UnitName
						});
					}
				}
				return Json(unitList, JsonRequestBehavior.AllowGet);
			}
			catch (Exception e)
			{
				System.Diagnostics.Debug.WriteLine(e.ToString());
			}
			return Json("An Error Occurred", JsonRequestBehavior.AllowGet);
		}

		/*
		 * POST: /Position/GetUnitPracticeList
		 * Takes a Unit Id of the current Unit selected, and returns a list of active practices.
		 */
		[HttpPost]
		public ActionResult GetUnitPracticeList(int UnitId)
		{
			try
			{
				List<UnitPracticeList> unitPracticesList = new List<UnitPracticeList>();
				Unit unit = db.Units.Find(UnitId);
				List<UnitPractice> unitPractices = unit.UnitPractices.ToList<UnitPractice>();
				foreach (UnitPractice up in unitPractices)
				{
					if (up.Active == true)
					{
						unitPracticesList.Add(new UnitPracticeList
						{
							UnitPracticeId = up.UnitPracticeId,
							PracticeId = up.PracticeId,
							PracticeName = up.Practice.PracticeName
						});
					}
				}
				return Json(unitPracticesList, JsonRequestBehavior.AllowGet);
			}
			catch (Exception e)
			{
				System.Diagnostics.Debug.WriteLine(e.ToString());
				return Json("An Error Occurred", JsonRequestBehavior.AllowGet);
			}
		}

		/*
		 * GET: /Position/GetPositionStatusList
		 * Returns a JSON list of Active partial PositionStatusList Objects including PositionStatusId, PositionStatusName.
		 */
		[HttpGet]
		public ActionResult GetPositionStatusList()
		{
			try
			{
				List<PositionStatus> positionStatuses = db.PositionStatuses.ToList();

				List<PositionStatusList> statuses = new List<PositionStatusList>();
				foreach (PositionStatus ps in positionStatuses)
				{
					if (ps.Active == true)
					{
						statuses.Add(new PositionStatusList
						{
							PositionStatusId = ps.PositionStatusId,
							PositionStatusName = ps.PositionStatusName
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

		/*
		 * GET: /Position/GetOpportunityList
		 * Returns a JSON list of Active partial OpportunityList Objects including OpportunityId, OpportunityName.
		 */
		[HttpGet]
		public ActionResult GetOpportunityList()
		{
			try
			{
				List<Opportunity> opportunities = db.Opportunities.ToList();

				List<OpportunityList> opportunityList = new List<OpportunityList>();
				foreach (Opportunity o in opportunities)
				{
					if (o.Active == true)
					{
						opportunityList.Add(new OpportunityList
						{
							OpportunityId = o.OpportunityId,
							OpportunityName = o.OpportunityName
						});
					}
				}
				return Json(opportunityList, JsonRequestBehavior.AllowGet);
			}
			catch (Exception e)
			{
				System.Diagnostics.Debug.WriteLine(e.ToString());
			}
			return Json("An Error Occurred", JsonRequestBehavior.AllowGet);
		}

		/*
		 * GET: /Position/GetGradeList
		 * Returns a JSON list of Active partial GradeList Objects including GradeId, GradeName.
		 */
		[HttpGet]
		public ActionResult GetGradeList()
		{
			try
			{
				List<Grade> grades = db.Grades.ToList();

				List<GradeList> gradeList = new List<GradeList>();
				foreach (Grade g in grades)
				{
					if (g.Active == true)
					{
						gradeList.Add(new GradeList
						{
							GradeId = g.ConsultantGradeId,
							GradeName = g.ConsultantGradeName
						});
					}
				}
				return Json(gradeList, JsonRequestBehavior.AllowGet);
			}
			catch (Exception e)
			{
				System.Diagnostics.Debug.WriteLine(e.ToString());
			}
			return Json("An Error Occurred", JsonRequestBehavior.AllowGet);
		}

		/*
		* GET: /Position/GetUserList
		* Returns a JSON list of UnitList Objects including UnitId and UnitName
		*/
		[HttpGet]
		public ActionResult GetUserList()
		{
			try
			{
				List<User> users = db.Users.ToList();

				List<UserList> userList = new List<UserList>();
				foreach (User u in users)
				{
					if (u.Active == true)
					{
						userList.Add(new UserList
						{
							UserId = u.UserId,
							UserFullName = u.FullName
						});
					}
				}
				return Json(userList, JsonRequestBehavior.AllowGet);
			}
			catch (Exception e)
			{
				System.Diagnostics.Debug.WriteLine(e.ToString());
			}
			return Json("An Error Occurred", JsonRequestBehavior.AllowGet);
		}
	}
}
