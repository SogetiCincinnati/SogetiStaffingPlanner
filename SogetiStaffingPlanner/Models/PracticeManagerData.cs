using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SogetiStaffingPlanner.Models
{
    public partial class PracticeManagerData
    {
        public string OpportunityName { get; set; }
        public string AEName { get; set; }
        public string ACTName { get; set; }
        public string ClientContact { get; set; }
        public string PositionStatusName { get; set; }
        public bool OpActive { get; set; }
        public string Skillset { get; set; }
        public Nullable<int> AE { get; set; }
        public Nullable<int> ACT { get; set; }
        public string UnitName { get; set; }
        public Nullable<int> Rate { get; set; }
        public Nullable<System.DateTime> LastModified { get; set; }
        public string ProposedCandidate { get; set; }
        public Nullable<System.DateTime> ExpectedStartDate { get; set; }
        public Nullable<int> NumberOfPositions { get; set; }
        public Nullable<int> Duration { get; set; }
        public string HireCandidate { get; set; }
        public string AcceptedCandidate { get; set; }
        public string RejectedCandidate { get; set; }
        public string PositionNote { get; set; }
        public Nullable<int> MaxConsultantGradeId { get; set; }
        public Nullable<int> MinConsultantGradeId { get; set; }
        public string ClientName { get; set; }
        public string ClientSubbusiness { get; set; }
        public Nullable<bool> SActive { get; set; }
        public string SoldStatusName { get; set; }
        public string PracticeName { get; set; }
        public string PositionName { get; set; }
        public string MinConsultantGrade { get; set; }
        public string MaxConsultantGrade { get; set; }
        public string Priority { get; set; }
        public string ExpectedStartDateString { get; set; }
        public List<PositionData> Positions { get; internal set; }
    }
}