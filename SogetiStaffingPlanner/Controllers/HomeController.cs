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
		private String CalculatePriority(int NumberOfPositions)
		{
					if (NumberOfPositions == 1)
					{
						return ("Medium");
					}
					if (NumberOfPositions >= 2)
					{
						return "High";
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
                var returnJSON = new List<PracticeManagerData> { };
                var ACTList = new List<UserData> { };
                var AEList = new List<UserData> { };


                List<Opportunity> opportunities = db.Opportunities.ToList<Opportunity>();
                List<OpportunityData> opportunityList = new List<OpportunityData> { };
                List<Position> positions = db.Positions.ToList<Position>();
                List<PositionData> positionList = new List<PositionData> { };
                List<Client> clients = db.Clients.ToList<Client>();
                List<ClientData> clientList = new List<ClientData> { };
                List<Unit> units = db.Units.ToList<Unit>();
                List<SoldStatus> statuses = db.SoldStatuses.ToList<SoldStatus>();
                List<User> users = db.Users.ToList<User>();
                List < UserData > userList = new List<UserData> { };
                List<UserBusinessRole> userBusinessRoles = db.UserBusinessRoles.ToList<UserBusinessRole>();
                
                
                foreach (UserBusinessRole ubr in userBusinessRoles)
                {
                    foreach (User us in users)
                    {
                       if (ubr.UserId == us.UserId)
                        {
                            if (ubr.BusinessRoleId == 3)
                            {
                                ACTList.Add(new UserData
                                {
                                    FullName = us.FullName,
                                    UserId = us.UserId

                                });
                            }
                            else if (ubr.BusinessRoleId == 2)
                            {
                                AEList.Add(new UserData
                                {
                                    FullName = us.FullName,
                                    UserId = us.UserId
                                });
                            }
                        }
                        
                    }
                }
      
                PracticeManagerData oppJSON = new PracticeManagerData();
                PracticeManagerData positionJSON = new PracticeManagerData();
                PracticeManagerData clientJSON = new PracticeManagerData();
                PracticeManagerData unitJSON = new PracticeManagerData();
                PracticeManagerData soldStatusJSON = new PracticeManagerData();

                //bool match = new bool();

                foreach (Position p in positions)
                {
                    foreach (Opportunity o in opportunities)
                    {
                        if (o.OpportunityId == p.OpportunityId)
                        {
                            oppJSON.OpportunityName = o.OpportunityName;
                            oppJSON.OpportunityId = o.OpportunityId;
                            oppJSON.ClientContact = o.ClientContact;
                            oppJSON.AE = o.AccountExecutiveUserId;
                            oppJSON.ACT = o.OpportunityOwnerUserId;
                            foreach (Client c in clients)
                            {
                                if (o.ClientId == c.ClientId)
                                {
                                    clientJSON.ClientName = c.ClientName;
                                    clientJSON.ClientSubbusiness = c.ClientSubbusiness;
                                }
                            }
                            //Loop through units
                            foreach (Unit u in units)
                            {
                                if (o.UnitId == u.UnitId)
                                {
                                    unitJSON.UnitName = u.UnitName;
                                }
                            }
                            //Loop through sold statuses
                            foreach (SoldStatus s in statuses)
                            {

                                if (o.SoldStatusId == 1)
                                {
                                    soldStatusJSON.SoldStatusName = "Yes";
                                }
                                else
                                {
                                    soldStatusJSON.SoldStatusName = "No";
                                }
                            }
                        }
                        
                    }
                    returnJSON.Add(new PracticeManagerData
                    {
                        PositionName = p.PositionName,
                        PositionId = p.PositionId,
                        OpportunityName = oppJSON.OpportunityName,
                        Skillset = p.Skillset,
                        Rate = p.Rate == null ? 0 : (int)p.Rate,
                        LastModified = p.LastModified,
                        ProposedCandidate = p.ProposedCandidate,
                        ExpectedStartDate = p.ExpectedStartDate == null ? new DateTime(1000, 1, 1) : (System.DateTime)p.ExpectedStartDate,
                        NumberOfPositions = p.NumberOfPositions,
                        Duration = p.Duration == null ? 0 : (int)p.Duration,
                        HireCandidate = p.HireCandidate,
                        AcceptedCandidate = p.AcceptedCandidate,
                        RejectedCandidate = p.RejectedCandidate,
                        MaxConsultantGradeId = p.MaxConsultantGradeId == null ? 0 : (int)p.MaxConsultantGradeId,
                        MinConsultantGradeId = p.MinConsultantGradeId == null ? 0 : (int)p.MinConsultantGradeId,
                        PositionNote = p.PositionNote,
                        ClientName = clientJSON.ClientName,
                        ClientSubbusiness = clientJSON.ClientSubbusiness,
                        ClientContact = oppJSON.ClientContact,
                        UnitName = unitJSON.UnitName,
                        SoldStatusName = soldStatusJSON.SoldStatusName,
                        SActive = soldStatusJSON.SActive,
                        PositionStatusId = p.PositionStatusId,
                        AE = oppJSON.AE,
                        ACT = oppJSON.ACT,
                        Priority = this.CalculatePriority(p.NumberOfPositions),
                        OpportunityId = oppJSON.OpportunityId
                    });
                }
                
                
             
            return Json(returnJSON, JsonRequestBehavior.AllowGet);
            }     
            catch(Exception e)
            {
                Console.WriteLine("An error occured {0}", e);
                return Json("Unable to get from database", JsonRequestBehavior.AllowGet);
            }
            
        }
        
    }
}




/* foreach (Opportunity o in opportunities)
                {
                    System.Diagnostics.Debug.WriteLine("OPPORTUNITY LOOP ............................");
                    if (o.Active == true)
                    {
                        oppJSON.OpportunityName = o.OpportunityName;
                        oppJSON.AE = o.AccountExecutiveUserId;
                        oppJSON.ACT = o.OpportunityOwnerUserId;
                    }
             
             
                    foreach (Position p in positions)
                    {                         
                        if (o.OpportunityId == p.OpportunityId)
                        {
                            match = true;
                           
                            positionList.Add(new PositionData
                            {
                                PositionName = p.PositionName,
                                Skillset = p.Skillset,
                                Rate = p.Rate == null ? 0 : (int)p.Rate,
                                LastModified = p.LastModified,
                                ProposedCandidate = p.ProposedCandidate,
                                ExpectedStartDate = p.ExpectedStartDate == null ? new DateTime(1000, 1, 1) : (System.DateTime)p.ExpectedStartDate,
                                NumberOfPositions = p.NumberOfPositions,
                                Duration = p.Duration == null ? 0 : (int)p.Duration,
                                HireCandidate = p.HireCandidate,
                                AcceptedCandidate = p.AcceptedCandidate,
                                RejectedCandidate = p.RejectedCandidate,
                                MaxConsultantGradeId = p.MaxConsultantGradeId == null ? 0 : (int)p.MaxConsultantGradeId,
                                MinConsultantGradeId = p.MinConsultantGradeId == null ? 0 : (int)p.MinConsultantGradeId,
                                PositionNote = p.PositionNote
                            });
                        }
                        else
                        {
                            
                        }
                        
                    }
                    //Loop through clients
                    foreach (Client c in clients)
                    {
                        if (o.ClientId == c.ClientId)
                        {
                            clientJSON.ClientName = c.ClientName;
                            clientJSON.ClientSubbusiness = c.ClientSubbusiness;
                        }
                    }
                    //Loop through units
                    foreach (Unit u in units)
                    {
                        if (o.UnitId == u.UnitId)
                        {
                            unitJSON.UnitName = u.UnitName;
                        }
                    }
                    //Loop through sold statuses
                    foreach (SoldStatus s in statuses)
                    {
     
                        if (o.SoldStatusId == 1)
                        {
                            soldStatusJSON.SoldStatusName = "Yes";
                        } else
                        {
                            soldStatusJSON.SoldStatusName = "No";
                        }
                    }
                    // Check to see if the Opportunity has an associated position.
                    if (match == true)
                    {
                        returnJSON.Add(new PracticeManagerData
                        {
                            OpportunityName = oppJSON.OpportunityName,
                            AE = oppJSON.AE,
                            ACT = oppJSON.ACT,
                            Positions = positionList,
                            ClientName = clientJSON.ClientName,
                            ClientSubbusiness = clientJSON.ClientSubbusiness,
                            UnitName = unitJSON.UnitName,
                            SoldStatusName = soldStatusJSON.SoldStatusName,
                            SActive = soldStatusJSON.SActive
                        });
                    } else
                    {
                        returnJSON.Add(new PracticeManagerData
                        {
                            OpportunityName = oppJSON.OpportunityName,
                            AE = oppJSON.AE,
                            ACT = oppJSON.ACT,
                            Positions = null,
                            ClientName = clientJSON.ClientName,
                            ClientSubbusiness = clientJSON.ClientSubbusiness,
                            UnitName = unitJSON.UnitName,
                            SoldStatusName = soldStatusJSON.SoldStatusName,
                            SActive = soldStatusJSON.SActive
                        });
                    }
                    match = false;
                }
*/