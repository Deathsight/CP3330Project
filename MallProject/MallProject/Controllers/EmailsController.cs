using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace MallProject.Controllers
{
    public class Email
    {
        public string To { get; set; }
        public string Body { get; set; }
        public string Subject { get; set; }
    }

    public class EmailsController : ApiController
    {
        public string SendEmail(Email ec)
        {
            string To = ec.To;
            string Body = ec.Body;
            string Subject = ec.Subject;
            MailMessage mm = new MailMessage();
            mm.From = new MailAddress("SkrrrMall@gmail.com");
            mm.Subject = Subject;
            mm.Body = Body;
            mm.To.Add(To);
            mm.IsBodyHtml = false;

            SmtpClient smtp = new SmtpClient("smtp.gmail.com");
            smtp.Port = 587;
            smtp.UseDefaultCredentials = true;
            smtp.EnableSsl = true;
            smtp.Credentials = new System.Net.NetworkCredential("SkrrrMall@gmail.com", "Project123_");
            smtp.Send(mm);

            return "The Maill has been sent" + ec.To.ToString();
        }
    }
}
