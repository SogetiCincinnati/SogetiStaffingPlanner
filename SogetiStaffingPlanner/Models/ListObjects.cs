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
}