using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace P4.Models
{
    public class User
    {
        [Required]
        public Guid UserId { get; set; }
        public string Email { get; set; }
        public string HashedPassword { get; set; }
        public string Login { get; set; }
        public bool isAdmin { get; set; }
        public bool isBanned { get; set; }

        public List<Photo> UserPhotos{ get; set; }
        public List<PhotoComment> UserComments { get; set; }
        public List<PhotoReview> UserReviews { get; set; }
    }
}
