﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace P4.Models
{
    public class AppDBContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<PhotoComment> PhotoComments { get; set; }
        public DbSet<PhotoReview> PhotoReviews { get; set; }

        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {
            Database.EnsureDeleted();  
            Database.EnsureCreated();   
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PhotoComment>()
                .HasOne(p => p.User)
                .WithMany(t => t.UserComments)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<PhotoReview>()
                .HasOne(p => p.User)
                .WithMany(t => t.UserReviews)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<User>().Property(x => x.UserId).HasDefaultValueSql("NEWID()");
            modelBuilder.Entity<Photo>().Property(x => x.PhotoId).HasDefaultValueSql("NEWID()");
            modelBuilder.Entity<PhotoComment>().Property(x => x.PhotoCommentId).HasDefaultValueSql("NEWID()");
            modelBuilder.Entity<PhotoReview>().Property(x => x.PhotoReviewId).HasDefaultValueSql("NEWID()");
        }
    }
}
