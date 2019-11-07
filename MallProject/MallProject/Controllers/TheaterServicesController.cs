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
    public class TheaterServicesController : ApiController
    {
        private Database1Entities db = new Database1Entities();

        // GET: api/TheaterServices
        public IQueryable<TheaterService> GetTheaterServices()
        {
            return db.TheaterServices;
        }

        // GET: api/TheaterServices/5
        [ResponseType(typeof(TheaterService))]
        public IHttpActionResult GetTheaterService(int id)
        {
            TheaterService theaterService = db.TheaterServices.Find(id);
            if (theaterService == null)
            {
                return NotFound();
            }

            return Ok(theaterService);
        }

        // PUT: api/TheaterServices/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTheaterService(int id, TheaterService theaterService)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != theaterService.Id)
            {
                return BadRequest();
            }

            db.Entry(theaterService).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TheaterServiceExists(id))
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

        // POST: api/TheaterServices
        [ResponseType(typeof(TheaterService))]
        public IHttpActionResult PostTheaterService(TheaterService theaterService)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TheaterServices.Add(theaterService);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = theaterService.Id }, theaterService);
        }

        // DELETE: api/TheaterServices/5
        [ResponseType(typeof(TheaterService))]
        public IHttpActionResult DeleteTheaterService(int id)
        {
            TheaterService theaterService = db.TheaterServices.Find(id);
            if (theaterService == null)
            {
                return NotFound();
            }

            db.TheaterServices.Remove(theaterService);
            db.SaveChanges();

            return Ok(theaterService);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TheaterServiceExists(int id)
        {
            return db.TheaterServices.Count(e => e.Id == id) > 0;
        }
    }
}