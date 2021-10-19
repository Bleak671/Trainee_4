using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace P4.Models
{
    public class Users
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public string HashedPassword { get; set; }
        public string Login { get; set; }
        public bool isAdmin { get; set; }
        public bool isBanned { get; set; }
    }
}
