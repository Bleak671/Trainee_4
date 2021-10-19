using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace P4.Models
{
    public class Photos
    {
        public int PhotoId { get; set; }
        public string Link { get; set; }
        public int OwnerId { get; set; }
        public string Name { get; set; }
        public DateTime UploadDate { get; set; }
        public string Hash { get; set; }
        public DateTime TrashDate { get; set; }
        public int Views { get; set; }
        public bool isPublished { get; set; }
        public bool isTrash { get; set; }
    }
}
