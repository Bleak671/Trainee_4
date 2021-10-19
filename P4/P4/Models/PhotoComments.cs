using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace P4.Models
{
    public class PhotoComments
    {
        public int CommentId { get; set; }
        public int PhotoId { get; set; }
        public int AuthorId { get; set; }
        public string Text { get; set; }
    }
}
