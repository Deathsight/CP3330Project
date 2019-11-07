using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using MallProject.Models;

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

        // POST: api/SupportTickets
        [ResponseType(typeof(SupportTicket))]
        public IHttpActionResult PostSupportTicket(SupportTicket supportTicket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.SupportTickets.Add(supportTicket);
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