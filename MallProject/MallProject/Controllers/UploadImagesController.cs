using MallProject.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace MallProject.Controllers
{
    [Authorize]
    //[RoutePrefix("api/Upload")]
    public class UploadImagesController : ApiController
    {
        private Database1Entities db = new Database1Entities();
        //[Route("user/PostUserImage")]
        public async Task<HttpResponseMessage> PostUploadImage(string type)
        {

            Dictionary<string, object> dict = new Dictionary<string, object>();
            try
            {

                var httpRequest = HttpContext.Current.Request;

                foreach (string file in httpRequest.Files)
                {
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created);

                    var postedFile = httpRequest.Files[file];
                    if (postedFile != null && postedFile.ContentLength > 0)
                    {

                        int MaxContentLength = 1024 * 1024 * 10; //Size = 1 MB  

                        IList<string> AllowedFileExtensions = new List<string> { ".jpg", ".gif", ".png", ".jfif" };
                        var ext = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.'));
                        var extension = ext.ToLower();
                        if (!AllowedFileExtensions.Contains(extension))
                        {

                            var message = string.Format("Please Upload image of type .jpg,.gif,.png.");

                            dict.Add("error", message);
                            return Request.CreateResponse(HttpStatusCode.BadRequest, dict);
                        }
                        else if (postedFile.ContentLength > MaxContentLength)
                        {

                            var message = string.Format("Please Upload a file upto 1 mb.");

                            dict.Add("error", message);
                            return Request.CreateResponse(HttpStatusCode.BadRequest, dict);
                        }
                        else if (type == "QID")
                        {
                            string imgName = postedFile.FileName.Substring(0, postedFile.FileName.LastIndexOf('.') - 1);

                            var filePath = HttpContext.Current.Server.MapPath("~/mallprojectreact/public/RentersQIDs/" + imgName + ".png");

                            filePath = filePath.Replace(@"\MallProject\MallProject", "");

                            postedFile.SaveAs(filePath);

                            string email = User.Identity.GetUserName();

                            Renter renter = db.Renters.Find(email);

                            renter.QIdPic = imgName + ".png";

                            db.Entry(renter).State = EntityState.Modified;

                            db.SaveChanges();
                        }
                        else if (type == "Advertisment")
                        {

                            Debug.WriteLine("Advertisment");
                            string imgName = postedFile.FileName.Substring(0, postedFile.FileName.LastIndexOf('.') - 1);

                            var filePath = HttpContext.Current.Server.MapPath("~/mallprojectreact/public/Advertisment/" + imgName + ".png");

                            filePath = filePath.Replace(@"\MallProject\MallProject", "");

                            postedFile.SaveAs(filePath);

                            Advertisement ad;

                            string email = User.Identity.GetUserName();

                            ad = db.Advertisements.SingleOrDefault(x => x.MediaContent == "Empty");

                            ad.MediaContent = imgName + ".png";

                            db.Entry(ad).State = EntityState.Modified;

                            db.SaveChanges();
                        }

                        else
                        {
                            string email = User.Identity.GetUserName();

                            var filePath = HttpContext.Current.Server.MapPath("~/mallprojectreact/public/ProfileImages/" + email + ".png");

                            filePath = filePath.Replace(@"\MallProject\MallProject", "");

                            postedFile.SaveAs(filePath);

                        }
                    }

                    var message1 = string.Format("Image Updated Successfully.");
                    return Request.CreateErrorResponse(HttpStatusCode.Created, message1); ;
                }
                var res = string.Format("Please Upload a image.");
                dict.Add("error", res);
                return Request.CreateResponse(HttpStatusCode.NotFound, dict);
            }

            catch (Exception ex)
            {
                var res = string.Format("some Message");
                dict.Add("error", res);
                return Request.CreateResponse(HttpStatusCode.NotFound, dict);
            }
        }
        public async Task<HttpResponseMessage> PostUploadImage(string type,int? id)
        {

            Dictionary<string, object> dict = new Dictionary<string, object>();
            try
            {

                var httpRequest = HttpContext.Current.Request;

                foreach (string file in httpRequest.Files)
                {
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created);

                    var postedFile = httpRequest.Files[file];
                    if (postedFile != null && postedFile.ContentLength > 0)
                    {

                        int MaxContentLength = 1024 * 1024 * 10; //Size = 1 MB  

                        IList<string> AllowedFileExtensions = new List<string> { ".jpg", ".gif", ".png", ".jfif" };
                        var ext = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.'));
                        var extension = ext.ToLower();
                        if (!AllowedFileExtensions.Contains(extension))
                        {

                            var message = string.Format("Please Upload image of type .jpg,.gif,.png.");

                            dict.Add("error", message);
                            return Request.CreateResponse(HttpStatusCode.BadRequest, dict);
                        }
                        else if (postedFile.ContentLength > MaxContentLength)
                        {

                            var message = string.Format("Please Upload a file upto 1 mb.");

                            dict.Add("error", message);
                            return Request.CreateResponse(HttpStatusCode.BadRequest, dict);
                        }
                        else if (type == "Advertisment")
                        {

                            Debug.WriteLine("Advertisment");
                            string imgName = postedFile.FileName.Substring(0, postedFile.FileName.LastIndexOf('.') - 1);

                            var filePath = HttpContext.Current.Server.MapPath("~/mallprojectreact/public/Advertisment/" + imgName + ".png");

                            filePath = filePath.Replace(@"\MallProject\MallProject", "");

                            postedFile.SaveAs(filePath);
                            Advertisement ad;
                            string email = User.Identity.GetUserName();
                            if (id == null)
                            {
                                ad = db.Advertisements.SingleOrDefault(x => x.MediaContent == "Empty");
                            }
                            else {
                                ad = db.Advertisements.Find(id);
                            }
                            ad.MediaContent = imgName + ".png";

                            db.Entry(ad).State = EntityState.Modified;

                            db.SaveChanges();
                        }

                        else
                        {
                            string email = User.Identity.GetUserName();

                            var filePath = HttpContext.Current.Server.MapPath("~/mallprojectreact/public/ProfileImages/" + email + ".png");

                            filePath = filePath.Replace(@"\MallProject\MallProject", "");

                            postedFile.SaveAs(filePath);

                        }
                    }

                    var message1 = string.Format("Image Updated Successfully.");
                    return Request.CreateErrorResponse(HttpStatusCode.Created, message1); ;
                }
                var res = string.Format("Please Upload a image.");
                dict.Add("error", res);
                return Request.CreateResponse(HttpStatusCode.NotFound, dict);
            }

            catch (Exception ex)
            {
                var res = string.Format("some Message");
                dict.Add("error", res);
                return Request.CreateResponse(HttpStatusCode.NotFound, dict);
            }
        }
    }
}
