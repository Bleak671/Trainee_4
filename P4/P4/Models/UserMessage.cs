using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace P4.Models
{
    public class UserMessage
    {
        [Key]
        public Guid UserMessageId { get; set; }

        [Required]
        public Guid FromUserId { get; set; }
        [JsonIgnore]
        public User FromUser { get; set; }

        [Required]
        public Guid ToUserId { get; set; }
        [JsonIgnore]
        public User ToUser { get; set; }

        public string Text { get; set; }
        [Required]
        public DateTime UploadDate { get; set; }
    }
}
