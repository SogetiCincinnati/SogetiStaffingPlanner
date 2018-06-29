using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SogetiStaffingPlanner.Models
{
	/*
	* Used to store data from the Position Model + extra values for 
	* displaying foreign keys to the user in an understandable way. 
	*/
	public class PositionData
	{
		//Primary Key
		public int PositionId { get; set; }

		//Foreign Keys and their corresponding display values
		//Need to add display values for this class.
		public int OpportunityId { get; set; }

		public int UnitPracticeId { get; set; }

		public int MaxConsultantGradeId { get; set; }

		public int MinConsultantGradeId { get; set; }

		public int LastModifiedUserId { get; set; }

		public int PositionStatusId { get; set; }

		//Remaining Position Fields
		public string PositionName { get; set; }
		public int NumberOfPositions { get; set; }
		public string Skillset { get; set; }
		public int Rate { get; set; }
		public DateTime ExpectedStartDate { get; set; }
		public int Duration { get; set; }
		public string HireCandidate { get; set; }
		public string ProposedCandidate { get; set; }
		public string AcceptedCandidate { get; set; }
		public string RejectedCandidate { get; set; }
		public string PositionNote { get; set; }
		public DateTime LastModified { get; set; }
		public bool Active { get; set; }
	}
}