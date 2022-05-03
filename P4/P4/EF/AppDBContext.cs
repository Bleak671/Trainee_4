using Microsoft.EntityFrameworkCore;

namespace P4.Models
{
    public class AppDBContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<PhotoComment> PhotoComments { get; set; }
        public DbSet<PhotoReview> PhotoReviews { get; set; }
        public DbSet<Photo_m2m_Tag> PhotoTags { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<UserMessage> UserMessages { get; set; }

        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {
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

            modelBuilder.Entity<UserMessage>()
                .HasOne(p => p.FromUser)
                .WithMany(t => t.UserFromMessages)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Photo_m2m_Tag>()
               .HasOne(p => p.Photo)
               .WithMany(t => t.PhotoTags)
               .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Photo_m2m_Tag>()
               .HasOne(p => p.Tag)
               .WithMany(t => t.TagPhotos)
               .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<User>().Property(x => x.UserId).HasDefaultValueSql("NEWID()");
            modelBuilder.Entity<Photo>().Property(x => x.PhotoId).HasDefaultValueSql("NEWID()");
            modelBuilder.Entity<Tag>().Property(x => x.TagId).HasDefaultValueSql("NEWID()");
            modelBuilder.Entity<Photo_m2m_Tag>().Property(x => x.Id).HasDefaultValueSql("NEWID()");
            modelBuilder.Entity<UserMessage>().Property(x => x.UserMessageId).HasDefaultValueSql("NEWID()");
            modelBuilder.Entity<PhotoComment>().Property(x => x.PhotoCommentId).HasDefaultValueSql("NEWID()");
            modelBuilder.Entity<PhotoReview>().Property(x => x.PhotoReviewId).HasDefaultValueSql("NEWID()");
            modelBuilder.Entity<Photo>().Property(x => x.UploadDate).HasDefaultValueSql("getdate()");
        }
    }
}
