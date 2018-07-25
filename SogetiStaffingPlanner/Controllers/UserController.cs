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

        ClientOpportunitiesEntities db = new ClientOpportunitiesEntities();
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
                    userData.UserId = u.UserId;
                    userData.FullName = u.FullName;
                    userData.ViewRoleId = u.ViewRoleId;
                    userData.PermissionRoleId = u.PermissionRoleId;
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
        

        /*
* POST: /Client/EditClient
* Gets edited client information, updates the item in the entity, and saves the changes
*/
        [HttpPost]
        public ActionResult EditUser(int? userId, string name, int permission, int role)
        {
            System.Diagnostics.Debug.WriteLine("Edit User function called.");
            System.Diagnostics.Debug.WriteLine(userId);
            System.Diagnostics.Debug.WriteLine(name);
            System.Diagnostics.Debug.WriteLine(permission);
            System.Diagnostics.Debug.WriteLine(role);
            User user = db.Users.Find(userId);
            if (user != null)
            {
                user.FullName = name;
                user.PermissionRoleId = permission;
                user.ViewRoleId = role;
                //Hardcoding LastModifiedUserId until login/sessions get implemented
                user.LastModifiedUserId = 1;
                user.LastModified = DateTime.Now;
                user.Active = true;

                db.Entry(user).State = EntityState.Modified;
                db.SaveChanges();
                return Json("Client Edited Successfully", JsonRequestBehavior.AllowGet);
            }
            return Json("Error Occurred", JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetRoleList()
        {
            try
            {
                List<DefaultViewRole> role = db.DefaultViewRoles.ToList();

                List<RoleList> roleList = new List<RoleList>();
                foreach(DefaultViewRole d in role)
                {
                    if(d.Active == true)
                    {
                        roleList.Add(new RoleList
                        {
                            ViewRoleId = d.ViewRoleId,
                            ViewName = d.ViewName
                        });
                    }
                }
                return Json(roleList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e.ToString());
            }
            return Json("An Error Occurred", JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetPermissionList()
        {
            try
            {
                List<PermissionRole> role = db.PermissionRoles.ToList();

                List<PermissionList> permissions = new List<PermissionList>();
                foreach (PermissionRole d in role)
                {
                    if (d.Active == true)
                    {
                        permissions.Add(new PermissionList
                        {
                            PermissionRoleId = d.PermissionRoleId,
                            PermissionRoleName = d.PermissionRoleName
                        });
                    }
                }
                return Json(permissions, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e.ToString());
            }
            return Json("An Error Occurred", JsonRequestBehavior.AllowGet);
        }
    }
}