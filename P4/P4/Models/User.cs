using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace P4.Models
{
    public class User
    {
        [Key]
        public Guid UserId { get; set; }
        public string Email { get; set; }
        [Required]
        public string HashedPassword { get; set; }
        public string Login { get; set; }
        public bool isAdmin { get; set; }
        public bool isBanned { get; set; }

        [JsonIgnore]
        public List<Photo> UserPhotos{ get; set; }
        [JsonIgnore]
        public List<PhotoComment> UserComments { get; set; }
        [JsonIgnore]
        public List<PhotoReview> UserReviews { get; set; }
    }
}
