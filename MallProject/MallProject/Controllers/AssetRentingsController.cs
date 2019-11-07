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
    public class AssetRentingsController : ApiController
    {
        private Database1Entities db = new Database1Entities();

        // GET: api/AssetRentings
        public IQueryable<AssetRenting> GetAssetRentings()
        {
            return db.AssetRentings;
        }

        // GET: api/AssetRentings/5
        [ResponseType(typeof(AssetRenting))]
        public IHttpActionResult GetAssetRenting(int id)
        {
            AssetRenting assetRenting = db.AssetRentings.Find(id);
            if (assetRenting == null)
            {
                return NotFound();
            }

            return Ok(assetRenting);
        }

        // PUT: api/AssetRentings/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAssetRenting(int id, AssetRenting assetRenting)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != assetRenting.Id)
            {
                return BadRequest();
            }

            db.Entry(assetRenting).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AssetRentingExists(id))
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

        // POST: api/AssetRentings
        [ResponseType(typeof(AssetRenting))]
        public IHttpActionResult PostAssetRenting(AssetRenting assetRenting)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.AssetRentings.Add(assetRenting);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = assetRenting.Id }, assetRenting);
        }

        // DELETE: api/AssetRentings/5
        [ResponseType(typeof(AssetRenting))]
        public IHttpActionResult DeleteAssetRenting(int id)
        {
            AssetRenting assetRenting = db.AssetRentings.Find(id);
            if (assetRenting == null)
            {
                return NotFound();
            }

            db.AssetRentings.Remove(assetRenting);
            db.SaveChanges();

            return Ok(assetRenting);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AssetRentingExists(int id)
        {
            return db.AssetRentings.Count(e => e.Id == id) > 0;
        }
    }
}