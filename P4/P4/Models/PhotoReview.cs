using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace P4.Models
{
    public class PhotoReview
    {
        [Required]
        public Guid PhotoReviewId { get; set; }
        
        public Guid PhotoId { get; set; }
        public Photo Photo { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; }

        public bool isPositive { get; set; }
    }
}
