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
    public class BookingSeatsController : ApiController
    {
        private Database1Entities db = new Database1Entities();

        // GET: api/BookingSeats
        public IQueryable<BookingSeat> GetBookingSeats()
        {
            return db.BookingSeats;
        }

        // GET: api/BookingSeats/5
        [ResponseType(typeof(BookingSeat))]
        public IHttpActionResult GetBookingSeat(int id)
        {
            BookingSeat bookingSeat = db.BookingSeats.Find(id);
            if (bookingSeat == null)
            {
                return NotFound();
            }

            return Ok(bookingSeat);
        }

        // PUT: api/BookingSeats/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBookingSeat(int id, BookingSeat bookingSeat)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bookingSeat.Id)
            {
                return BadRequest();
            }

            db.Entry(bookingSeat).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingSeatExists(id))
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

        // POST: api/BookingSeats
        [ResponseType(typeof(BookingSeat))]
        public IHttpActionResult PostBookingSeat(BookingSeat bookingSeat)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.BookingSeats.Add(bookingSeat);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = bookingSeat.Id }, bookingSeat);
        }

        // DELETE: api/BookingSeats/5
        [ResponseType(typeof(BookingSeat))]
        public IHttpActionResult DeleteBookingSeat(int id)
        {
            BookingSeat bookingSeat = db.BookingSeats.Find(id);
            if (bookingSeat == null)
            {
                return NotFound();
            }

            db.BookingSeats.Remove(bookingSeat);
            db.SaveChanges();

            return Ok(bookingSeat);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BookingSeatExists(int id)
        {
            return db.BookingSeats.Count(e => e.Id == id) > 0;
        }
    }
}