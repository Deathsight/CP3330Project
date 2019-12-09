using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Caching;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using MallProject.Models;
using Microsoft.AspNet.Identity;

namespace MallProject.Controllers
{
    [Authorize]
    public class UsersController : ApiController
    {
        private Database1Entities db = new Database1Entities();
        
        [AllowAnonymous]
        [Route("api/Users/verifyCode/{code?}/{email?}")]
        public IHttpActionResult GetVerifyCode(string code, string email)
        {
            MemoryCache memoryCache = MemoryCache.Default;
            
            if (memoryCache.Get(code) != null)
            {
                
                if (memoryCache.Get(code).ToString() == email)
                {
                    return Ok("Success");
                }
            }
            return BadRequest("Failed");
        }

        [AllowAnonymous]
        [Route ("api/Users/generateCode/{email?}")]
        public IHttpActionResult GetGenerateCode(string email)
        {

            Random random = new Random();
            StringBuilder strBuilder = new StringBuilder();
            char ch;
            for (int i = 0; i < 6; i++)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                strBuilder.Append(ch);
            }
            string code = strBuilder.ToString();

            MemoryCache memoryCache = MemoryCache.Default;
            bool result = memoryCache.Add(code, email, DateTimeOffset.UtcNow.AddMinutes(1));
            Email mail = new Email { To = email, Subject = "Account Activation", Body = "Your Activation Code is: " + code };
            var emailController = new EmailsController();
            emailController.SendEmail(mail);
            
            return Ok("Code Sent");
        }

        // GET: api/Users
        public IQueryable<User> GetUsers()
        {
            return db.Users;
        }

        // GET: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(string id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // GET: api/Users/?query=query
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUserByQuery(string query)
        {
            User user = db.Users.Find(User.Identity.GetUserName());

            if (query == "profile" && user != null)
            {
                return Ok(user);
            }

            if (query == "getRole" && user != null)
            {
                return Ok(user.Role.Name);
            }

            if (query == "getNews" && user != null)
            {
                if (user.Renter != null)
                {
                    return Ok(user.Renter.News);
                }
            }
            if (query == "getAgents" && user != null)
            {
                return Ok(db.Users.Where(r => r.RoleID == 3));
            }
            if (query == "getRenting" && user != null)
            {
                return Ok(user.Renter.Rentings);
            }
            if (query == "getCleanings" && user != null)
            {
                return Ok(user.Cleanings);
            }

            return NotFound();
        }

        // PUT: api/Users/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser(string id, User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Email)
            {
                return BadRequest();
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // PUT: api/Users
        // Edit Profile
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCustomer(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string email = User.Identity.GetUserName();

            if (email != user.Email)
            {
                return BadRequest();
            }

            db.Entry(user).State = EntityState.Modified;
            db.SaveChanges();

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(email))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Users
        [ResponseType(typeof(User))]
        public IHttpActionResult PostUser(User user)
        {
            User info = user;
            if (user.Email == null)
            {
                string email = User.Identity.GetUserName();
                user = db.Users.Find(email);
                if (user == null)
                {
                    user = new User { Email = email, Name = info.Name, Phone = info.Phone, RoleID = info.RoleID };
                }
                else
                {
                    return Ok();
                }
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Users.Add(user);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.Email))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = user.Email }, user);
        }

        // DELETE: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult DeleteUser(string id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            db.SaveChanges();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(string id)
        {
            return db.Users.Count(e => e.Email == id) > 0;
        }
    }
}