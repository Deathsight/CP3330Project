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
    public class STicketTypesController : ApiController
    {
        private Database1Entities db = new Database1Entities();

        // GET: api/STicketTypes
        public IQueryable<STicketType> GetSTicketTypes()
        {
            return db.STicketTypes;
        }

        // GET: api/STicketTypes/5
        [ResponseType(typeof(STicketType))]
        public IHttpActionResult GetSTicketType(int id)
        {
            STicketType sTicketType = db.STicketTypes.Find(id);
            if (sTicketType == null)
            {
                return NotFound();
            }

            return Ok(sTicketType);
        }

        // PUT: api/STicketTypes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSTicketType(int id, STicketType sTicketType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sTicketType.Id)
            {
                return BadRequest();
            }

            db.Entry(sTicketType).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!STicketTypeExists(id))
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

        // POST: api/STicketTypes
        [ResponseType(typeof(STicketType))]
        public IHttpActionResult PostSTicketType(STicketType sTicketType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.STicketTypes.Add(sTicketType);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = sTicketType.Id }, sTicketType);
        }

        // DELETE: api/STicketTypes/5
        [ResponseType(typeof(STicketType))]
        public IHttpActionResult DeleteSTicketType(int id)
        {
            STicketType sTicketType = db.STicketTypes.Find(id);
            if (sTicketType == null)
            {
                return NotFound();
            }

            db.STicketTypes.Remove(sTicketType);
            db.SaveChanges();

            return Ok(sTicketType);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool STicketTypeExists(int id)
        {
            return db.STicketTypes.Count(e => e.Id == id) > 0;
        }
    }
}