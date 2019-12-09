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

        public class AssetRentingPlus
        {
            public List<int> AssetId { get; set; }
            public DateTime StartDateTime { get; set; }
            public DateTime EndDateTime { get; set; }
            public double TotalPrice { get; set; }
            public string Status { get; set; }
            public string ReferalCode { get; set; }
            public int SecurityId { get; set; }
            
        }

        // POST: api/AssetRentings
        [ResponseType(typeof(AssetRenting))]
        public IHttpActionResult PostAssetRenting(AssetRentingPlus assetRentingPlus)
        {
            string email = User.Identity.GetUserName();

            Renting renting = db.Rentings.SingleOrDefault(r =>
            r.RenterEmail == email &&
            r.StartDateTime == assetRentingPlus.StartDateTime &&
            r.EndDateTime == assetRentingPlus.EndDateTime
            
            );
            if (renting != null) { 
            if (renting.Status == "Draft") {

                foreach (AssetRenting item in renting.AssetRentings)
                {
                    db.AssetRentings.Remove(item); 
                }
                db.Rentings.Remove(renting);
                db.SaveChanges();
                renting = null;
            }}
            if (renting == null)
            {
 
                // make new renting record
                renting = new Renting
                {
                    RenterEmail = email,
                    StartDateTime = assetRentingPlus.StartDateTime,
                    EndDateTime = assetRentingPlus.EndDateTime,
                    TotalPrice = assetRentingPlus.TotalPrice,
                    Status = assetRentingPlus.Status,
                    ReferalCode = assetRentingPlus.ReferalCode,
                    SecurityId = assetRentingPlus.SecurityId
                };
                db.Rentings.Add(renting);
                db.SaveChanges();
            }

            renting = db.Rentings.SingleOrDefault(r =>
                r.RenterEmail == email &&
                r.StartDateTime == assetRentingPlus.StartDateTime &&
                r.EndDateTime == assetRentingPlus.EndDateTime
            );


            foreach (int id in assetRentingPlus.AssetId)
            {
                if(assetRentingPlus.Status != "Draft") { 
                    List<Renting> draftRentings = db.Rentings.Where(r => r.Status == "Draft" && r.AssetRentings.Where(ar => ar.AssetId == id).Count() > 0).ToList();
                        foreach (Renting item in draftRentings)
                        {
                            //foreach (AssetRenting aRenting in item.AssetRentings)
                            //{
                            //    db.AssetRentings.Remove(aRenting);
                            //    db.SaveChanges();
                            //}
                            db.Rentings.Remove(item);
                            db.SaveChanges();
                        }
                }

                AssetRenting assetRenting = new AssetRenting { RentingId = renting.Id, AssetId = id};

                db.AssetRentings.Add(assetRenting);
                db.SaveChanges();
            }

            return CreatedAtRoute("DefaultApi", new { id = assetRentingPlus.AssetId }, assetRentingPlus);
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