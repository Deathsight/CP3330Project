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
    
    public partial class Favorite
    {
        public int Id { get; set; }
        public string UserEmail { get; set; }
        public string RenterEmail { get; set; }
    
        public virtual Renter Renter { get; set; }
        public virtual User User { get; set; }
    }
}
