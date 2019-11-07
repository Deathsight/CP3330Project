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
    public class STicketChatsController : ApiController
    {
        private Database1Entities db = new Database1Entities();

        // GET: api/STicketChats
        public IQueryable<STicketChat> GetSTicketChats()
        {
            return db.STicketChats;
        }

        // GET: api/STicketChats/5
        [ResponseType(typeof(STicketChat))]
        public IHttpActionResult GetSTicketChat(int id)
        {
            STicketChat sTicketChat = db.STicketChats.Find(id);
            if (sTicketChat == null)
            {
                return NotFound();
            }

            return Ok(sTicketChat);
        }

        // PUT: api/STicketChats/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSTicketChat(int id, STicketChat sTicketChat)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sTicketChat.Id)
            {
                return BadRequest();
            }

            db.Entry(sTicketChat).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!STicketChatExists(id))
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

        // POST: api/STicketChats
        [ResponseType(typeof(STicketChat))]
        public IHttpActionResult PostSTicketChat(STicketChat sTicketChat)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.STicketChats.Add(sTicketChat);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = sTicketChat.Id }, sTicketChat);
        }

        // DELETE: api/STicketChats/5
        [ResponseType(typeof(STicketChat))]
        public IHttpActionResult DeleteSTicketChat(int id)
        {
            STicketChat sTicketChat = db.STicketChats.Find(id);
            if (sTicketChat == null)
            {
                return NotFound();
            }

            db.STicketChats.Remove(sTicketChat);
            db.SaveChanges();

            return Ok(sTicketChat);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool STicketChatExists(int id)
        {
            return db.STicketChats.Count(e => e.Id == id) > 0;
        }
    }
}