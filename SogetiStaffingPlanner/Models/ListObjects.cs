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
}