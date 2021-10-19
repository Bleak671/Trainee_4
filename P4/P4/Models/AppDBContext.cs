using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace P4.Models
{
    public class AppDBContext : DbContext
    {
        public DbSet<User> User { get; set; }
        public DbSet<Photo> Photo { get; set; }
        public DbSet<PhotoComment> PhotoComment { get; set; }
        public DbSet<PhotoReview> PhotoReview { get; set; }

        public AppDBContext()
        {
            Database.EnsureDeleted();   // удаляем бд со старой схемой
            Database.EnsureCreated();   // создаем бд с новой схемой
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=P4;Trusted_Connection=True;");
            base.OnConfiguring(optionsBuilder);
        }
    }
}
