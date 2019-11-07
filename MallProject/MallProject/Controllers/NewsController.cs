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
    public class NewsController : ApiController
    {
        private Database1Entities db = new Database1Entities();

        // GET: api/News
        public IQueryable<New> GetNews()
        {
            return db.News;
        }

        // GET: api/News/5
        [ResponseType(typeof(New))]
        public IHttpActionResult GetNew(int id)
        {
            New @new = db.News.Find(id);
            if (@new == null)
            {
                return NotFound();
            }

            return Ok(@new);
        }

        // PUT: api/News/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutNew(int id, New @new)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != @new.Id)
            {
                return BadRequest();
            }

            db.Entry(@new).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NewExists(id))
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

        // POST: api/News
        [ResponseType(typeof(New))]
        public IHttpActionResult PostNew(New @new)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.News.Add(@new);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = @new.Id }, @new);
        }

        // DELETE: api/News/5
        [ResponseType(typeof(New))]
        public IHttpActionResult DeleteNew(int id)
        {
            New @new = db.News.Find(id);
            if (@new == null)
            {
                return NotFound();
            }

            db.News.Remove(@new);
            db.SaveChanges();

            return Ok(@new);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NewExists(int id)
        {
            return db.News.Count(e => e.Id == id) > 0;
        }
    }
}