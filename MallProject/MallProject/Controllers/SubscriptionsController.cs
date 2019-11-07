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
    public class SubscriptionsController : ApiController
    {
        private Database1Entities db = new Database1Entities();

        // GET: api/Subscriptions
        public IQueryable<Subscription> GetSubscriptions()
        {
            return db.Subscriptions;
        }

        // GET: api/Subscriptions/5
        [ResponseType(typeof(Subscription))]
        public IHttpActionResult GetSubscription(int id)
        {
            Subscription subscription = db.Subscriptions.Find(id);
            if (subscription == null)
            {
                return NotFound();
            }

            return Ok(subscription);
        }

        // PUT: api/Subscriptions/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSubscription(int id, Subscription subscription)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != subscription.Id)
            {
                return BadRequest();
            }

            db.Entry(subscription).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubscriptionExists(id))
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

        // POST: api/Subscriptions
        [ResponseType(typeof(Subscription))]
        public IHttpActionResult PostSubscription(Subscription subscription)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Subscriptions.Add(subscription);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = subscription.Id }, subscription);
        }

        // DELETE: api/Subscriptions/5
        [ResponseType(typeof(Subscription))]
        public IHttpActionResult DeleteSubscription(int id)
        {
            Subscription subscription = db.Subscriptions.Find(id);
            if (subscription == null)
            {
                return NotFound();
            }

            db.Subscriptions.Remove(subscription);
            db.SaveChanges();

            return Ok(subscription);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SubscriptionExists(int id)
        {
            return db.Subscriptions.Count(e => e.Id == id) > 0;
        }
    }
}