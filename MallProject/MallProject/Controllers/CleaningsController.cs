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
    public class CleaningsController : ApiController
    {
        private Database1Entities db = new Database1Entities();

        // GET: api/Cleanings
        public IQueryable<Cleaning> GetCleanings()
        {
            return db.Cleanings;
        }

        // GET: api/Cleanings/5
        [ResponseType(typeof(Cleaning))]
        public IHttpActionResult GetCleaning(int id)
        {
            Cleaning cleaning = db.Cleanings.Find(id);
            if (cleaning == null)
            {
                return NotFound();
            }

            return Ok(cleaning);
        }

        // PUT: api/Cleanings/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCleaning(int id, Cleaning cleaning)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cleaning.Id)
            {
                return BadRequest();
            }

            db.Entry(cleaning).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CleaningExists(id))
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

        // POST: api/Cleanings
        [ResponseType(typeof(Cleaning))]
        public IHttpActionResult PostCleaning(Cleaning cleaning)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Cleanings.Add(cleaning);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = cleaning.Id }, cleaning);
        }

        // DELETE: api/Cleanings/5
        [ResponseType(typeof(Cleaning))]
        public IHttpActionResult DeleteCleaning(int id)
        {
            Cleaning cleaning = db.Cleanings.Find(id);
            if (cleaning == null)
            {
                return NotFound();
            }

            db.Cleanings.Remove(cleaning);
            db.SaveChanges();

            return Ok(cleaning);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CleaningExists(int id)
        {
            return db.Cleanings.Count(e => e.Id == id) > 0;
        }
    }
}