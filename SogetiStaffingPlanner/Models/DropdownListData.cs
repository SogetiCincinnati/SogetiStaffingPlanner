using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SogetiStaffingPlanner.Models
{

	//Used for storing Client data for sending the dropdown list of Clients for dropdowns on the front end
	public class ClientList
	{
		public int ClientId { get; set; }
		public string ClientName {get; set;}
		public string ClientSubbusiness { get; set; }
	}

	//Used for storing User data for sending the dropdown list of AE's for dropdowns on the front end
	public class AEList
	{
		public int UserId { get; set; }
		public string FullName { get; set; }
	}

	//Used for storing User data for sending the dropdown list of ACT Leads for dropdowns on the front end
	public class ACTLeadList
	{
		public int UserId { get; set; }
		public string FullName { get; set; }
	}

	//Used for storing OpportunityStatus data for sending the dropdown list of Opportunity statuses for dropdowns on the front end
	public class PositionStatusList
	{
		public int PositionStatusId { get; set; }
		public string PositionStatusName { get; set; }
	}

	//Used for storing SoldStatus data for sending the dropdown list of Sold statuses for dropdowns on the front end
	public class SoldStatusList
	{
		public int SoldStatusId { get; set; }
		public string SoldStatusName { get; set; }
	}

	//Used for storing Region data for sending the dropdown list of Regions for dropdowns on the front end
	public class RegionList
	{
		public int RegionId { get; set; }
		public string RegionName { get; set; }
	}

	//Used for storing Unit data for sending the dropdown list of Units for dropdowns on the front end
	public class UnitList
	{
		public int UnitId { get; set; }
		public string UnitName { get; set; }
	}

	//Used for storing UnitPractice data for sending the dropdown list of UnitPractices for dropdowns on the front end
	public class UnitPracticeList
	{
		public int UnitPracticeId { get; set; }
		public int PracticeId { get; set; }
		public string PracticeName { get; set; }
	}

	//Used for storing Opportunity Data for sending the dropdown list of Opportunities for dropdowns on the front end
	public class OpportunityList
	{
		public int OpportunityId { get; set; }
		public string OpportunityName { get; set; }
	}

	//Used for storing Grade data for sending the dropdown list of UnitPractices for dropdowns on the front end
	public class GradeList
	{
		public int GradeId { get; set; }
		public string GradeName { get; set; }
	}

	//Used for storing User data for sending the dropdown list of Users for dropdowns on the front end
	public class UserList{
		public int UserId { get; set; }
		public string UserFullName { get; set; }
	}

    //Used for storing Viewrole data for sending the dropdown list for Users for dropdowns on the front end
    public class RoleList {
         public int ViewRoleId { get; set; }
         public string ViewName { get; set; }
    }

    
}