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
    
    public partial class STicketChat
    {
        public int Id { get; set; }
        public int STicketId { get; set; }
        public string UserEmail { get; set; }
        public System.DateTime DateTime { get; set; }
        public string Comment { get; set; }
    
        public virtual SupportTicket SupportTicket { get; set; }
    }
}