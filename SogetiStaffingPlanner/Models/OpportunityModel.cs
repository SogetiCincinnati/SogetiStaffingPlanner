using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SogetiStaffingPlanner.Models
{

    //Used for storing Client data for sending the dropdown list of Clients for dropdowns on the front end
    public class OpportunityModel
    {
        public int OpportunityId { get; set; }
        public int ClientId { get; set; }
        public int AccountExecutiveUserId { get; set; }
        public int UnitId { get; set; }
        public int RegionId { get; set; }
        public int SoldStatusId { get; set; }
        public string OpportunityName { get; set; }
        public int OpportunityOwnerUserId { get; set; }
        public string OpportunityNotes { get; set; }
        public string ClientContact { get; set; }
        public int LastModifiedUserId { get; set; }
        public DateTime LastModified { get; set; }
        public bool Active { get; set; }
    }
}