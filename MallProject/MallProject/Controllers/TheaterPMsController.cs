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
    public class TheaterPMsController : ApiController
    {
        private Database1Entities db = new Database1Entities();

        // GET: api/TheaterPMs
        public IQueryable<TheaterPM> GetTheaterPMs()
        {
            return db.TheaterPMs;
        }

        // GET: api/TheaterPMs/5
        [ResponseType(typeof(TheaterPM))]
        public IHttpActionResult GetTheaterPM(int id)
        {
            TheaterPM theaterPM = db.TheaterPMs.Find(id);
            if (theaterPM == null)
            {
                return NotFound();
            }

            return Ok(theaterPM);
        }

        // PUT: api/TheaterPMs/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTheaterPM(int id, TheaterPM theaterPM)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != theaterPM.Id)
            {
                return BadRequest();
            }

            db.Entry(theaterPM).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TheaterPMExists(id))
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

        // POST: api/TheaterPMs
        [ResponseType(typeof(TheaterPM))]
        public IHttpActionResult PostTheaterPM(TheaterPM theaterPM)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TheaterPMs.Add(theaterPM);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = theaterPM.Id }, theaterPM);
        }

        // DELETE: api/TheaterPMs/5
        [ResponseType(typeof(TheaterPM))]
        public IHttpActionResult DeleteTheaterPM(int id)
        {
            TheaterPM theaterPM = db.TheaterPMs.Find(id);
            if (theaterPM == null)
            {
                return NotFound();
            }

            db.TheaterPMs.Remove(theaterPM);
            db.SaveChanges();

            return Ok(theaterPM);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TheaterPMExists(int id)
        {
            return db.TheaterPMs.Count(e => e.Id == id) > 0;
        }
    }
}