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
    public class AssetRentingEventsController : ApiController
    {
        private Database1Entities db = new Database1Entities();

        // GET: api/AssetRentingEvents
        public IQueryable<AssetRentingEvent> GetAssetRentingEvents()
        {
            return db.AssetRentingEvents;
        }

        // GET: api/AssetRentingEvents/5
        [ResponseType(typeof(AssetRentingEvent))]
        public IHttpActionResult GetAssetRentingEvent(int id)
        {
            AssetRentingEvent assetRentingEvent = db.AssetRentingEvents.Find(id);
            if (assetRentingEvent == null)
            {
                return NotFound();
            }

            return Ok(assetRentingEvent);
        }

        // PUT: api/AssetRentingEvents/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAssetRentingEvent(int id, AssetRentingEvent assetRentingEvent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != assetRentingEvent.Id)
            {
                return BadRequest();
            }

            db.Entry(assetRentingEvent).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AssetRentingEventExists(id))
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

        // POST: api/AssetRentingEvents
        [ResponseType(typeof(AssetRentingEvent))]
        public IHttpActionResult PostAssetRentingEvent(AssetRentingEvent assetRentingEvent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.AssetRentingEvents.Add(assetRentingEvent);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = assetRentingEvent.Id }, assetRentingEvent);
        }

        // DELETE: api/AssetRentingEvents/5
        [ResponseType(typeof(AssetRentingEvent))]
        public IHttpActionResult DeleteAssetRentingEvent(int id)
        {
            AssetRentingEvent assetRentingEvent = db.AssetRentingEvents.Find(id);
            if (assetRentingEvent == null)
            {
                return NotFound();
            }

            db.AssetRentingEvents.Remove(assetRentingEvent);
            db.SaveChanges();

            return Ok(assetRentingEvent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AssetRentingEventExists(int id)
        {
            return db.AssetRentingEvents.Count(e => e.Id == id) > 0;
        }
    }
}