//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MallProject.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class AssetRenting
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public AssetRenting()
        {
            this.AssetRentingEvents = new HashSet<AssetRentingEvent>();
        }
    
        public int Id { get; set; }
        public int RentingId { get; set; }
        public int AssetId { get; set; }
    
        public virtual Asset Asset { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AssetRentingEvent> AssetRentingEvents { get; set; }
        public virtual Renting Renting { get; set; }
    }
}
