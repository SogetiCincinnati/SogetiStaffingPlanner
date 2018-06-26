using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SogetiStaffingPlanner.Models
{

    //Used for storing Client data for sending the dropdown list of Clients for dropdowns on the front end
    public class OpportunityModel
    {
        public int opportunityId { get; set; }
        public int clientId { get; set; }
        public int accountExecutiveUserId { get; set; }
        public int unitId { get; set; }
        public int regionId { get; set; }
        public int soldStatusId { get; set; }
        public string opportunityName { get; set; }
        public int opportunityOwnerUserId { get; set; }
        public string opportunityNotes { get; set; }
        public string clientContact { get; set; }
        public int lastModifiedUserId { get; set; }
        public DateTime lastModified { get; set; }
        public bool active { get; set; }
    }
}