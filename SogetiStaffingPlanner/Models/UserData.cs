using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SogetiStaffingPlanner.Models
{
	/*
	* Used to store data from the Client Model + extra values for 
	* displaying foreign keys to the user in an understandable way. 
	*/
	public class UserData
	{
		//Primary Key
		public string FullName { get; set; }

		//Foreign Keys and their corresponding display values
		public int LastModifiedUserId { get; set; }
		public string LastModifiedUserName { get; set; }
        public int ViewRoleId { get; set; }
        public int PermissionRoleId { get; set; }

        //Remaining Client Fields
		public bool Active { get; set; }
        public DateTime LastModified { get; set; }
    }
}