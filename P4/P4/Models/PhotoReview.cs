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
        public Photo Photo { get; set; }

        [Required]
        public Guid UserId { get; set; }
        public User User { get; set; }

        public bool isPositive { get; set; }
    }
}
