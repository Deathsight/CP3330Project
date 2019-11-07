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
    public class TheatersController : ApiController
    {
        private Database1Entities db = new Database1Entities();

        // GET: api/Theaters
        public IQueryable<Theater> GetTheaters()
        {
            return db.Theaters;
        }

        // GET: api/Theaters/5
        [ResponseType(typeof(Theater))]
        public IHttpActionResult GetTheater(int id)
        {
            Theater theater = db.Theaters.Find(id);
            if (theater == null)
            {
                return NotFound();
            }

            return Ok(theater);
        }

        // PUT: api/Theaters/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTheater(int id, Theater theater)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != theater.AssetId)
            {
                return BadRequest();
            }

            db.Entry(theater).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TheaterExists(id))
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

        // POST: api/Theaters
        [ResponseType(typeof(Theater))]
        public IHttpActionResult PostTheater(Theater theater)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Theaters.Add(theater);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TheaterExists(theater.AssetId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = theater.AssetId }, theater);
        }

        // DELETE: api/Theaters/5
        [ResponseType(typeof(Theater))]
        public IHttpActionResult DeleteTheater(int id)
        {
            Theater theater = db.Theaters.Find(id);
            if (theater == null)
            {
                return NotFound();
            }

            db.Theaters.Remove(theater);
            db.SaveChanges();

            return Ok(theater);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TheaterExists(int id)
        {
            return db.Theaters.Count(e => e.AssetId == id) > 0;
        }
    }
}