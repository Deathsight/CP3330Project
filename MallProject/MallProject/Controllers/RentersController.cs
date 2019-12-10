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
using Microsoft.AspNet.Identity;

namespace MallProject.Controllers
{
    public class RentersController : ApiController
    {
        private Database1Entities db = new Database1Entities();

        // GET: api/Renters
        public IQueryable<Renter> GetRenters()
        {
            return db.Renters;
        }

        // GET: api/Renters/5
        [ResponseType(typeof(Renter))]
        public IHttpActionResult GetRenter(string id)
        {
            Renter renter = db.Renters.Find(id);
            if (renter == null)
            {
                return NotFound();
            }

            return Ok(renter);
        }

        // GET: api/Users/?query=query
        [ResponseType(typeof(Renter))]
        public IHttpActionResult GetUserByQuery(string query)
        {
            Renter renter = db.Renters.Find(User.Identity.GetUserName());

            if (query == "getRenter" && renter != null)
            {
                return Ok(renter);
            }
            if (query == "getAllRenter")
            {
                List<Renter> approvedRenters = db.Renters.Where(r => r.Status == "Approved").ToList();
                return Ok(approvedRenters);
            }

            return NotFound();
        }

        // PUT: api/Renters/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRenter(string id, Renter renter)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != renter.Email)
            {
                return BadRequest();
            }

            db.Entry(renter).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RenterExists(id))
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

        // POST: api/Renters
        [ResponseType(typeof(Renter))]
        public IHttpActionResult PostRenter(Renter renter)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Renters.Add(renter);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (RenterExists(renter.Email))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = renter.Email }, renter);
        }

        // DELETE: api/Renters/5
        [ResponseType(typeof(Renter))]
        public IHttpActionResult DeleteRenter(string id)
        {
            Renter renter = db.Renters.Find(id);
            if (renter == null)
            {
                return NotFound();
            }

            db.Renters.Remove(renter);
            db.SaveChanges();

            return Ok(renter);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RenterExists(string id)
        {
            return db.Renters.Count(e => e.Email == id) > 0;
        }
    }
}