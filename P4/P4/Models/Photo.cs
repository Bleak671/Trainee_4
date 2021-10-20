﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace P4.Models
{
    public class Photo
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid PhotoId { get; set; }
        public string Link { get; set; }

        public User User { get; set; }

        public string Name { get; set; }
        public DateTime UploadDate { get; set; }
        public string Hash { get; set; }
        public DateTime TrashDate { get; set; }
        public int Views { get; set; }
        public bool isPublished { get; set; }
        public bool isTrash { get; set; }

        public List<PhotoComment> PhotoComments { get; set; }
        public List<PhotoReview> PhotoReviews { get; set; }
    }
}
