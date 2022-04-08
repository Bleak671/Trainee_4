using System.Text.Json.Serialization;
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
        [JsonIgnore]
        public Photo Photo { get; set; }

        [Required]
        public Guid UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; }
        public string UserName { get; set; }
        public string Text { get; set; }
        public DateTime UploadDate { get; set; }
    }
}
