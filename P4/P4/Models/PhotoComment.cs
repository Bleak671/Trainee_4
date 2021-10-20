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
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid PhotoCommentId { get; set; }

        public Photo Photo { get; set; }

        public User User { get; set; }

        public string Text { get; set; }
    }
}
