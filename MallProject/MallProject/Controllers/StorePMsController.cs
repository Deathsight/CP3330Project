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
    public class StorePMsController : ApiController
    {
        private Database1Entities db = new Database1Entities();

        // GET: api/StorePMs
        public IQueryable<StorePM> GetStorePMs()
        {
            return db.StorePMs;
        }

        // GET: api/StorePMs/5
        [ResponseType(typeof(StorePM))]
        public IHttpActionResult GetStorePM(int id)
        {
            StorePM storePM = db.StorePMs.Find(id);
            if (storePM == null)
            {
                return NotFound();
            }

            return Ok(storePM);
        }

        // PUT: api/StorePMs/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutStorePM(int id, StorePM storePM)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != storePM.Id)
            {
                return BadRequest();
            }

            db.Entry(storePM).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StorePMExists(id))
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

        // POST: api/StorePMs
        [ResponseType(typeof(StorePM))]
        public IHttpActionResult PostStorePM(StorePM storePM)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.StorePMs.Add(storePM);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = storePM.Id }, storePM);
        }

        // DELETE: api/StorePMs/5
        [ResponseType(typeof(StorePM))]
        public IHttpActionResult DeleteStorePM(int id)
        {
            StorePM storePM = db.StorePMs.Find(id);
            if (storePM == null)
            {
                return NotFound();
            }

            db.StorePMs.Remove(storePM);
            db.SaveChanges();

            return Ok(storePM);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool StorePMExists(int id)
        {
            return db.StorePMs.Count(e => e.Id == id) > 0;
        }
    }
}