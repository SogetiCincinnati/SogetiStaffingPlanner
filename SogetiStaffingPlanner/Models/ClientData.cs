using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SogetiStaffingPlanner.Models
{
	public class ClientData
	{
		public int ClientId { get; set; }
		public string ClientName { get; set; }
		public string ClientSubbusiness { get; set; }
		public int LastModifiedUserId { get; set; }
		public string LastModifiedUserName {get; set;}
		public DateTime LastModified { get; set; }
		public bool Active { get; set; }
	}
}