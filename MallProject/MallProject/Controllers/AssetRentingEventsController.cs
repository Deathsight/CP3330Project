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

        public class EventsPlus
        {
            
            public DateTime StartTime { get; set; }
            public string ShowName { get; set; }
            public double Price { get; set; }

        }
        public class BookingSeatPlus
        {

            public string UserEmail { get; set; }
            public int SeatId { get; set; }
            public double Price { get; set; }
            public string Status { get; set; }
            public Nullable<int> SubscriptionId { get; set; }

        }

        // POST: api/AssetRentingEvents
        [ResponseType(typeof(AssetRentingEvent))]
        public IHttpActionResult PostAssetRentingEvent(BookingSeatPlus bs, int ar, int e)
        {
            string email = User.Identity.GetUserName();
            BookingSeat booking = new BookingSeat { UserEmail = User.Identity.GetUserName(), SeatId = bs.SeatId, Price = bs.Price,Status = bs.Status,SubscriptionId = bs.SubscriptionId };

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.BookingSeats.Add(booking);
            db.SaveChanges();

            BookingSeat createdBooking = db.BookingSeats.SingleOrDefault( b => 
            b.UserEmail == email &&
            b.SeatId == booking.SeatId &&
            b.Price == booking.Price &&
            b.Status == booking.Status);

            Event ev = db.Events.Find(e);
            AssetRenting arg = db.AssetRentings.Find(ar);

            

            AssetRentingEvent ase = new AssetRentingEvent { EventId = ev.Id, BookingSeatId = createdBooking.Id, AssetRentingId = arg.Id };

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.AssetRentingEvents.Add(ase);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = ase.Id }, ase);
        }

        // POST: api/AssetRentingEvents
        [ResponseType(typeof(AssetRentingEvent))]
        public IHttpActionResult PostAssetRentingEvent(EventsPlus e, int rentingId, int assetId)
        {
            Event newEvent = new Event { StartTime = e.StartTime, ShowName = e.ShowName, Price = e.Price };

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Events.Add(newEvent);
            db.SaveChanges();

            Event createdEvent = db.Events.SingleOrDefault(r => r.StartTime == e.StartTime && r.ShowName == e.ShowName && r.Price == e.Price);

            AssetRenting ar = db.AssetRentings.SingleOrDefault(a => a.RentingId == rentingId && a.AssetId == assetId);

            System.Diagnostics.Debug.WriteLine(rentingId + "," + assetId );

            AssetRentingEvent ase = new AssetRentingEvent { EventId = createdEvent.Id, BookingSeatId = null, AssetRentingId = ar.Id };

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.AssetRentingEvents.Add(ase);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = ase.Id }, ase);
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