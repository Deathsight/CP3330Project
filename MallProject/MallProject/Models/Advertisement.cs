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
    
    public partial class Advertisement
    {
        public int Id { get; set; }
        public string UserEmail { get; set; }
        public string Type { get; set; }
        public System.DateTime StartDateTime { get; set; }
        public System.DateTime EndDateTime { get; set; }
        public string MediaContent { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
    
        public virtual User User { get; set; }
    }
}