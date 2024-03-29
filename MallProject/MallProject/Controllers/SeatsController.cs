﻿using System;
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
    public class SeatsController : ApiController
    {
        private Database1Entities db = new Database1Entities();

        // GET: api/Seats
        public IQueryable<Seat> GetSeats()
        {
            return db.Seats;
        }

        // GET: api/Seats/5
        [ResponseType(typeof(Seat))]
        public IHttpActionResult GetSeat(int id)
        {
            Seat seat = db.Seats.Find(id);
            if (seat == null)
            {
                return NotFound();
            }

            return Ok(seat);
        }

        // GET: api/Seats/5
        [ResponseType(typeof(Seat))]
        public IHttpActionResult GetSeat(int id,string query)
        {
            Seat seat = db.Seats.Find(id);
          
            return Ok(seat);
        }

        // PUT: api/Seats/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSeat(int id, Seat seat)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != seat.Id)
            {
                return BadRequest();
            }

            db.Entry(seat).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SeatExists(id))
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

        // POST: api/Seats
        [ResponseType(typeof(Seat))]
        public IHttpActionResult PostSeat(Seat seat)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Seats.Add(seat);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = seat.Id }, seat);
        }

        // DELETE: api/Seats/5
        [ResponseType(typeof(Seat))]
        public IHttpActionResult DeleteSeat(int id)
        {
            Seat seat = db.Seats.Find(id);
            if (seat == null)
            {
                return NotFound();
            }

            db.Seats.Remove(seat);
            db.SaveChanges();

            return Ok(seat);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SeatExists(int id)
        {
            return db.Seats.Count(e => e.Id == id) > 0;
        }
    }
}