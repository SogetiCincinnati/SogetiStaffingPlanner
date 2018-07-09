using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SogetiStaffingPlanner.Models;
using System.Data.Entity;

namespace SogetiStaffingPlanner.Controllers
{
    public class UserController : Controller
    {

        Dev_ClientOpportunitiesEntities db = new Dev_ClientOpportunitiesEntities();
        // GET: User
        public ActionResult Index()
        {
            return View();
        }

        /*
		* GET: /User/GetUsers
		* Returns a Json Serialized List of Active Client information in the ClientData object.
		*/
        [HttpGet]
        public ActionResult GetUsers()
        {
            System.Diagnostics.Debug.WriteLine("Get Users List");


            List<User> users = db.Users.ToList<User>();
            List<UserData> userList = new List<UserData> { };
            foreach (User u in users)
            {
                if (u.Active == true)
                {
                    UserData userData = new UserData();
                    userData.FullName = u.FullName;
                    userData.ViewRoleId = u.ViewRoleId;
                    userData.LastModifiedUserId = u.LastModifiedUserId;
                    User user = db.Users.Find(u.LastModifiedUserId);
                    userData.LastModifiedUserName = user.FullName;
                    userData.LastModified = u.LastModified;
                    userData.Active = u.Active;

                    userList.Add(userData);
                }
            }
            return Json(userList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult AddUser(string fullName,bool active, int lastModifiedUserId, int viewRoleId, int permissionRoleId, DateTime lastModified)
        {
            System.Diagnostics.Debug.WriteLine("User Controller: AddUser function!!!");

            try
             {

                User userData = new User()
                {
                    FullName = fullName,
                    Active = true,
                    LastModifiedUserId = lastModifiedUserId,
                   // LastModifiedUserName = lastModifiedUserName,
                    ViewRoleId = viewRoleId,
                    PermissionRoleId = permissionRoleId,
                    LastModified = lastModified

                };
                db.Users.Add(userData);
                db.SaveChanges();
              }
            catch (Exception e)
                {
                System.Diagnostics.Debug.WriteLine(e.ToString());
                return Json("User Add Failed", JsonRequestBehavior.AllowGet);
                }
            return Json("User Added Successfully", JsonRequestBehavior.AllowGet);

        }
        


    }
}