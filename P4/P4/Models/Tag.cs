using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace P4.Models
{
    public class Tag
    {
        [Key]
        public Guid TagId { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public List<Photo_m2m_Tag> TagPhotos { get; set; }
    }
}
