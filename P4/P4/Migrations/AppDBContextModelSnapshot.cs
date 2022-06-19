﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using P4.Models;

namespace P4.Migrations
{
    [DbContext(typeof(AppDBContext))]
    partial class AppDBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.11")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("P4.Models.Photo", b =>
                {
                    b.Property<Guid>("PhotoId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("NEWID()");

                    b.Property<string>("Hash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Link")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("TrashDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("UploadDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("getdate()");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Views")
                        .HasColumnType("int");

                    b.Property<bool>("isPublished")
                        .HasColumnType("bit");

                    b.Property<bool>("isTrash")
                        .HasColumnType("bit");

                    b.HasKey("PhotoId");

                    b.HasIndex("UserId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("P4.Models.PhotoComment", b =>
                {
                    b.Property<Guid>("PhotoCommentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("NEWID()");

                    b.Property<Guid>("PhotoId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Text")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UploadDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PhotoCommentId");

                    b.HasIndex("PhotoId");

                    b.HasIndex("UserId");

                    b.ToTable("PhotoComments");
                });

            modelBuilder.Entity("P4.Models.PhotoReview", b =>
                {
                    b.Property<Guid>("PhotoReviewId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("NEWID()");

                    b.Property<Guid>("PhotoId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("isPositive")
                        .HasColumnType("bit");

                    b.HasKey("PhotoReviewId");

                    b.HasIndex("PhotoId");

                    b.HasIndex("UserId");

                    b.ToTable("PhotoReviews");
                });

            modelBuilder.Entity("P4.Models.Photo_m2m_Tag", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("NEWID()");

                    b.Property<Guid>("PhotoId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("TagId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("PhotoId");

                    b.HasIndex("TagId");

                    b.ToTable("PhotoTags");
                });

            modelBuilder.Entity("P4.Models.Tag", b =>
                {
                    b.Property<Guid>("TagId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("NEWID()");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TagId");

                    b.ToTable("Tags");
                });

            modelBuilder.Entity("P4.Models.User", b =>
                {
                    b.Property<Guid>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("NEWID()");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HashedPassword")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Login")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("isAdmin")
                        .HasColumnType("bit");

                    b.Property<bool>("isBanned")
                        .HasColumnType("bit");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("P4.Models.UserMessage", b =>
                {
                    b.Property<Guid>("UserMessageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("NEWID()");

                    b.Property<Guid>("FromUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Text")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("ToUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("UploadDate")
                        .HasColumnType("datetime2");

                    b.HasKey("UserMessageId");

                    b.HasIndex("FromUserId");

                    b.ToTable("UserMessages");
                });

            modelBuilder.Entity("P4.Models.Photo", b =>
                {
                    b.HasOne("P4.Models.User", "User")
                        .WithMany("UserPhotos")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("P4.Models.PhotoComment", b =>
                {
                    b.HasOne("P4.Models.Photo", "Photo")
                        .WithMany("PhotoComments")
                        .HasForeignKey("PhotoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("P4.Models.User", "User")
                        .WithMany("UserComments")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Photo");

                    b.Navigation("User");
                });

            modelBuilder.Entity("P4.Models.PhotoReview", b =>
                {
                    b.HasOne("P4.Models.Photo", "Photo")
                        .WithMany("PhotoReviews")
                        .HasForeignKey("PhotoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("P4.Models.User", "User")
                        .WithMany("UserReviews")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Photo");

                    b.Navigation("User");
                });

            modelBuilder.Entity("P4.Models.Photo_m2m_Tag", b =>
                {
                    b.HasOne("P4.Models.Photo", "Photo")
                        .WithMany("PhotoTags")
                        .HasForeignKey("PhotoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("P4.Models.Tag", "Tag")
                        .WithMany("TagPhotos")
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Photo");

                    b.Navigation("Tag");
                });

            modelBuilder.Entity("P4.Models.UserMessage", b =>
                {
                    b.HasOne("P4.Models.User", "FromUser")
                        .WithMany("UserFromMessages")
                        .HasForeignKey("FromUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("FromUser");
                });

            modelBuilder.Entity("P4.Models.Photo", b =>
                {
                    b.Navigation("PhotoComments");

                    b.Navigation("PhotoReviews");

                    b.Navigation("PhotoTags");
                });

            modelBuilder.Entity("P4.Models.Tag", b =>
                {
                    b.Navigation("TagPhotos");
                });

            modelBuilder.Entity("P4.Models.User", b =>
                {
                    b.Navigation("UserComments");

                    b.Navigation("UserFromMessages");

                    b.Navigation("UserPhotos");

                    b.Navigation("UserReviews");
                });
#pragma warning restore 612, 618
        }
    }
}
