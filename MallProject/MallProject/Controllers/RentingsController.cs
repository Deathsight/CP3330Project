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
    public class RentingsController : ApiController
    {
        private Database1Entities db = new Database1Entities();

        // GET: api/Rentings
        public IQueryable<Renting> GetRentings()
        {
            return db.Rentings;
        }

        // GET: api/Rentings/5
        [ResponseType(typeof(Renting))]
        public IHttpActionResult GetRenting(int id)
        {
            Renting renting = db.Rentings.Find(id);
            if (renting == null)
            {
                return NotFound();
            }

            return Ok(renting);
        }

        // PUT: api/Rentings/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRenting(int id, Renting renting)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != renting.Id)
            {
                return BadRequest();
            }

            db.Entry(renting).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RentingExists(id))
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

        // POST: api/Rentings
        [ResponseType(typeof(Renting))]
        public IHttpActionResult PostRenting(Renting renting)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Rentings.Add(renting);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = renting.Id }, renting);
        }

        // DELETE: api/Rentings/5
        [ResponseType(typeof(Renting))]
        public IHttpActionResult DeleteRenting(int id)
        {
            Renting renting = db.Rentings.Find(id);
            if (renting == null)
            {
                return NotFound();
            }

            db.Rentings.Remove(renting);
            db.SaveChanges();

            return Ok(renting);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RentingExists(int id)
        {
            return db.Rentings.Count(e => e.Id == id) > 0;
        }
    }
}