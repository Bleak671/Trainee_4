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
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid PhotoReviewId { get; set; }
        
        public Photo Photo { get; set; }

        public User User { get; set; }

        public bool isPositive { get; set; }
    }
}
