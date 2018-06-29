using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SogetiStaffingPlanner.Models
{
	/*
	 * Used to store data from the Opportunity Model + extra values for 
	 * displaying foreign keys to the user in an understandable way. 
	 */
    public class OpportunityData
    {
		//Primary Key
        public int opportunityId { get; set; }

		//Foreign Keys and their corresponding display value
        public int clientId { get; set; }

        public int accountExecutiveUserId { get; set; }

        public int unitId { get; set; }

        public int regionId { get; set; }

        public int soldStatusId { get; set; }

		//Remaining Opportunity Fields
        public string opportunityName { get; set; }
        public int opportunityOwnerUserId { get; set; }
        public string opportunityNotes { get; set; }
        public string clientContact { get; set; }
        public int lastModifiedUserId { get; set; }
        public DateTime lastModified { get; set; }
        public bool active { get; set; }
    }
}