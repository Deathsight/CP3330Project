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
    public class SubscriptionLevelsController : ApiController
    {
        private Database1Entities db = new Database1Entities();

        // GET: api/SubscriptionLevels
        public IQueryable<SubscriptionLevel> GetSubscriptionLevels()
        {
            return db.SubscriptionLevels;
        }

        // GET: api/SubscriptionLevels/5
        [ResponseType(typeof(SubscriptionLevel))]
        public IHttpActionResult GetSubscriptionLevel(int id)
        {
            SubscriptionLevel subscriptionLevel = db.SubscriptionLevels.Find(id);
            if (subscriptionLevel == null)
            {
                return NotFound();
            }

            return Ok(subscriptionLevel);
        }

        // PUT: api/SubscriptionLevels/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSubscriptionLevel(int id, SubscriptionLevel subscriptionLevel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != subscriptionLevel.Id)
            {
                return BadRequest();
            }

            db.Entry(subscriptionLevel).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubscriptionLevelExists(id))
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

        // POST: api/SubscriptionLevels
        [ResponseType(typeof(SubscriptionLevel))]
        public IHttpActionResult PostSubscriptionLevel(SubscriptionLevel subscriptionLevel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.SubscriptionLevels.Add(subscriptionLevel);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = subscriptionLevel.Id }, subscriptionLevel);
        }

        // DELETE: api/SubscriptionLevels/5
        [ResponseType(typeof(SubscriptionLevel))]
        public IHttpActionResult DeleteSubscriptionLevel(int id)
        {
            SubscriptionLevel subscriptionLevel = db.SubscriptionLevels.Find(id);
            if (subscriptionLevel == null)
            {
                return NotFound();
            }

            db.SubscriptionLevels.Remove(subscriptionLevel);
            db.SaveChanges();

            return Ok(subscriptionLevel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SubscriptionLevelExists(int id)
        {
            return db.SubscriptionLevels.Count(e => e.Id == id) > 0;
        }
    }
}