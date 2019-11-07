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
    public class SecuritiesController : ApiController
    {
        private Database1Entities db = new Database1Entities();

        // GET: api/Securities
        public IQueryable<Security> GetSecurities()
        {
            return db.Securities;
        }

        // GET: api/Securities/5
        [ResponseType(typeof(Security))]
        public IHttpActionResult GetSecurity(int id)
        {
            Security security = db.Securities.Find(id);
            if (security == null)
            {
                return NotFound();
            }

            return Ok(security);
        }

        // PUT: api/Securities/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSecurity(int id, Security security)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != security.Id)
            {
                return BadRequest();
            }

            db.Entry(security).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SecurityExists(id))
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

        // POST: api/Securities
        [ResponseType(typeof(Security))]
        public IHttpActionResult PostSecurity(Security security)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Securities.Add(security);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = security.Id }, security);
        }

        // DELETE: api/Securities/5
        [ResponseType(typeof(Security))]
        public IHttpActionResult DeleteSecurity(int id)
        {
            Security security = db.Securities.Find(id);
            if (security == null)
            {
                return NotFound();
            }

            db.Securities.Remove(security);
            db.SaveChanges();

            return Ok(security);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SecurityExists(int id)
        {
            return db.Securities.Count(e => e.Id == id) > 0;
        }
    }
}