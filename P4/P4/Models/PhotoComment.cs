using System;
using System.ComponentModel.DataAnnotations;

namespace P4.Models
{
    public class PhotoComment
    {
        [Key]
        public Guid PhotoCommentId { get; set; }

        [Required]
        public Guid PhotoId { get; set; }
        public Photo Photo { get; set; }

        [Required]
        public Guid UserId { get; set; }
        public User User { get; set; }

        public string Text { get; set; }
    }
}
