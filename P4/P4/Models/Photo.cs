using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace P4.Models
{
    public class Photo
    {
        [Key]
        public Guid PhotoId { get; set; }
        [Required]
        public string Link { get; set; }

        [Required]
        public Guid UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; }

        public string Name { get; set; }
        [Required]
        public DateTime UploadDate { get; set; }
        public string Hash { get; set; }
        public DateTime TrashDate { get; set; }
        public int Views { get; set; }
        public bool isPublished { get; set; }
        public bool isTrash { get; set; }

        [JsonIgnore]
        public List<PhotoComment> PhotoComments { get; set; }
        [JsonIgnore]
        public List<PhotoReview> PhotoReviews { get; set; }
    }
}
