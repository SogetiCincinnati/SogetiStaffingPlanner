using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SogetiStaffingPlanner.Models
{
	public class ClientList
	{
		public int ClientId { get; set; }
		public string ClientName {get; set;}
		public string ClientSubbusiness { get; set; }
	}

	public class OpportunityStatusList
	{
		public int OpportunityStatusId { get; set; }
		public string OpportunityStatusName { get; set; }
	}

	public class SoldStatusList
	{
		public int SoldStatusId { get; set; }
		public string SoldStatusName { get; set; }
	}

	public class RegionList
	{
		public int RegionId { get; set; }
		public string RegionName { get; set; }
	}

	public class UnitList
	{
		public int UnitId { get; set; }
		public string UnitName { get; set; }
	}
}