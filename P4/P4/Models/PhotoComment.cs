using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace P4.Models
{
    public class PhotoComment
    {
        [Key]
        public Guid PhotoCommentId { get; set; }

        public Guid PhotoId { get; set; }
        public Photo Photo { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; }

        public string Text { get; set; }
    }
}
