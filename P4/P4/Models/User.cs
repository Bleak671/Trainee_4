using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace P4.Models
{
    public class User
    {
        [Key]
        public Guid UserId { get; set; }
        public string Email { get; set; }
        [Required]
        public string HashedPassword { get; set; }
        [Required]
        public string Login { get; set; }
        public bool isAdmin { get; set; }
        public bool isBanned { get; set; }

        public List<Photo> UserPhotos{ get; set; }
        public List<PhotoComment> UserComments { get; set; }
        public List<PhotoReview> UserReviews { get; set; }
    }
}
