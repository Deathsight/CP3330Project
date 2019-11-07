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
    
    public partial class BookingSeat
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public BookingSeat()
        {
            this.AssetRentingEvents = new HashSet<AssetRentingEvent>();
        }
    
        public int Id { get; set; }
        public string UserEmail { get; set; }
        public int SeatId { get; set; }
        public double Price { get; set; }
        public string Status { get; set; }
        public Nullable<int> SubscriptionId { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AssetRentingEvent> AssetRentingEvents { get; set; }
        public virtual Seat Seat { get; set; }
        public virtual Subscription Subscription { get; set; }
        public virtual User User { get; set; }
    }
}
