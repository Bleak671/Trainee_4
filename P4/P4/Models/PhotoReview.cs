using System.Text.Json.Serialization;
using System;
using System.ComponentModel.DataAnnotations;

namespace P4.Models
{
    public class PhotoReview
    {
        [Key]
        public Guid PhotoReviewId { get; set; }

        [Required]
        public Guid PhotoId { get; set; }
        [JsonIgnore]
        public Photo Photo { get; set; }

        [Required]
        public Guid UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; }

        public bool isPositive { get; set; }
    }
}
