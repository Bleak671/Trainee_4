using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace P4.Models
{
    public class Photo_m2m_Tag
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid PhotoId { get; set; }
        [JsonIgnore]
        public Photo Photo { get; set; }

        [Required]
        public Guid TagId { get; set; }
        [JsonIgnore]
        public Tag Tag { get; set; }
    }
}
