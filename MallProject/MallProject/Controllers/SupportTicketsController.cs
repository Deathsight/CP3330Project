using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using MallProject.Models;
using Microsoft.AspNet.Identity;

namespace MallProject.Controllers
{
    public class SupportTicketsController : ApiController
    {
        private Database1Entities db = new Database1Entities();

        // GET: api/SupportTickets
        public IQueryable<SupportTicket> GetSupportTickets()
        {
            return db.SupportTickets;
        }

        // GET: api/SupportTickets/5
        [ResponseType(typeof(SupportTicket))]
        public IHttpActionResult GetSupportTicket(int id)
        {
            SupportTicket supportTicket = db.SupportTickets.Find(id);
            if (supportTicket == null)
            {
                return NotFound();
            }

            return Ok(supportTicket);
        }

        // PUT: api/SupportTickets/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSupportTicket(int id, SupportTicket supportTicket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != supportTicket.Id)
            {
                return BadRequest();
            }

            db.Entry(supportTicket).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SupportTicketExists(id))
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

        // PUT: api/SupportTickets/5
        // Take Ticket - Transfer Ticket
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSupportTicket(int id, string email)
        {
            SupportTicket supportTicket = db.SupportTickets.Find(id);

            if (supportTicket == null)
            {
                return BadRequest();
            }

            if(email == "null")
            {
                supportTicket.AgentEmail = User.Identity.GetUserName();
            }
            else
            {
                User user = db.Users.Find(email);
                if (user == null)
                {
                    return NotFound();
                }
                else
                {
                    supportTicket.AgentEmail = email;
                }
            }
            db.Entry(supportTicket).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SupportTicketExists(id))
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

        // POST: api/SupportTickets
        [ResponseType(typeof(SupportTicket))]
        public IHttpActionResult PostSupportTicket(SupportTicket supportTicket)
        {
            supportTicket.UserEmail = User.Identity.GetUserName();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.SupportTickets.Add(supportTicket);
            db.SaveChanges();

            STicketChat ticketChat = new STicketChat { STicketId = supportTicket.Id, UserEmail = supportTicket.UserEmail, DateTime = supportTicket.SubmitDate, Comment = supportTicket.Description };

            db.STicketChats.Add(ticketChat);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = supportTicket.Id }, supportTicket);
        }

        // DELETE: api/SupportTickets/5
        [ResponseType(typeof(SupportTicket))]
        public IHttpActionResult DeleteSupportTicket(int id)
        {
            SupportTicket supportTicket = db.SupportTickets.Find(id);
            if (supportTicket == null)
            {
                return NotFound();
            }

            db.SupportTickets.Remove(supportTicket);
            db.SaveChanges();

            return Ok(supportTicket);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SupportTicketExists(int id)
        {
            return db.SupportTickets.Count(e => e.Id == id) > 0;
        }
    }
}