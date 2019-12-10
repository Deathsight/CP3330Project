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
    public class AssetsController : ApiController
    {
        private Database1Entities db = new Database1Entities();

        // GET: api/Assets
        public IQueryable<Asset> GetAssets()
        {
            return db.Assets;
        }

        // GET: api/Assets/5
        [ResponseType(typeof(Asset))]
        public IHttpActionResult GetAsset(int id)
        {
            Asset asset = db.Assets.Find(id);
            if (asset == null)
            {
                return NotFound();
            }

            return Ok(asset);
        }

        // GET: api/Assets/?query=query
        [ResponseType(typeof(Asset))]
        public IHttpActionResult GetUserByQuery(string query)
        {

            if (query == "getAssets")
            {
                List<Asset> availableAssets = db.Assets.Where(a => a.AssetRentings.Where(ar => ar.Renting.EndDateTime > DateTime.Now && ar.Renting.Status != "Draft" && ar.Renting.Status != "Expired").Count() == 0).ToList();

                //foreach (Asset asset in assets)
                //{
                //    if(asset.AssetRentings == null)
                //    {
                //        availableAssets.Add(asset);
                //    }
                //    else
                //    {
                //        Boolean status = true;
                //        foreach (AssetRenting assetRenting in asset.AssetRentings)
                //        {
                //            if(assetRenting.Renting.EndDateTime > DateTime.Now)
                //            {
                //                status = false;
                //            }
                //        }

                //        if(status == true)
                //        {
                //            availableAssets.Add(asset);
                //        }
                //    }
                //}

                return Ok(availableAssets);
            }


            return NotFound();
        }

        // PUT: api/Assets/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAsset(int id, Asset asset)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != asset.Id)
            {
                return BadRequest();
            }

            db.Entry(asset).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AssetExists(id))
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

        // POST: api/Assets
        [ResponseType(typeof(Asset))]
        public IHttpActionResult PostAsset(Asset asset)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Assets.Add(asset);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = asset.Id }, asset);
        }

        // DELETE: api/Assets/5
        [ResponseType(typeof(Asset))]
        public IHttpActionResult DeleteAsset(int id)
        {
            Asset asset = db.Assets.Find(id);
            if (asset == null)
            {
                return NotFound();
            }

            db.Assets.Remove(asset);
            db.SaveChanges();

            return Ok(asset);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AssetExists(int id)
        {
            return db.Assets.Count(e => e.Id == id) > 0;
        }
    }
}