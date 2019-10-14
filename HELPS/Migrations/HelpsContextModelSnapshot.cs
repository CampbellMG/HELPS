﻿// <auto-generated />
using System;
using HELPS.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace HELPS.Migrations
{
    [DbContext(typeof(HelpsContext))]
    partial class HelpsContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.2.3-servicing-35854")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("HELPS.Models.Advisor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<bool>("IsActive");

                    b.Property<string>("LastName");

                    b.HasKey("Id");

                    b.ToTable("Advisors");
                });

            modelBuilder.Entity("HELPS.Models.Email", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Content");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("Emails");
                });

            modelBuilder.Entity("HELPS.Models.EmailVariable", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("EmailId");

                    b.Property<string>("Example");

                    b.Property<string>("Name");

                    b.Property<string>("Variable");

                    b.HasKey("Id");

                    b.HasIndex("EmailId");

                    b.ToTable("EmailVariable");
                });

            modelBuilder.Entity("HELPS.Models.File", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<byte[]>("Data");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Files");
                });

            modelBuilder.Entity("HELPS.Models.Message", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Content");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("HELPS.Models.Room", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("HELPS.Models.Session", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AdvisorId");

                    b.Property<string>("AdvisorName");

                    b.Property<string>("AssignmentType");

                    b.Property<string>("Comments");

                    b.Property<int>("Duration");

                    b.Property<int[]>("FileIds");

                    b.Property<bool>("GroupAssignment");

                    b.Property<string>("Purpose");

                    b.Property<int>("RoomId");

                    b.Property<DateTime>("Starttime");

                    b.Property<int>("StudentId");

                    b.Property<string>("SubjectName");

                    b.Property<string>("Type");

                    b.HasKey("Id");

                    b.ToTable("Sessions");
                });

            modelBuilder.Entity("HELPS.Models.Skill", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("Skills");
                });

            modelBuilder.Entity("HELPS.Models.Student", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("BestContactNumber");

                    b.Property<string>("CountryOfOrigin");

                    b.Property<string>("Course");

                    b.Property<string>("DOB");

                    b.Property<string>("Degree");

                    b.Property<string>("EducationalBackground");

                    b.Property<string>("Email");

                    b.Property<string>("Faculty");

                    b.Property<string>("FirstLanguage");

                    b.Property<string>("Gender");

                    b.Property<bool>("HasCompletedCAF");

                    b.Property<string>("HomePhone");

                    b.Property<bool>("IsSpecialNeeds");

                    b.Property<string>("MobileNumber");

                    b.Property<string>("Name");

                    b.Property<string>("Other");

                    b.Property<string>("PrefFirstName");

                    b.Property<string>("RegisteredDate");

                    b.Property<string>("Status");

                    b.Property<string>("Year");

                    b.HasKey("Id");

                    b.ToTable("Students");
                });

            modelBuilder.Entity("HELPS.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Password");

                    b.Property<string>("Token");

                    b.Property<string>("Username");

                    b.Property<bool>("isAdmin");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("HELPS.Models.Workshop", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AdvisorId");

                    b.Property<int[]>("AttendingStudentIds");

                    b.Property<int>("AvailablePlaces");

                    b.Property<string>("Description");

                    b.Property<int>("Duration");

                    b.Property<int>("RoomId");

                    b.Property<int[]>("StudentIds");

                    b.Property<string>("TargetGroup");

                    b.Property<DateTime>("Time");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("Workshops");
                });

            modelBuilder.Entity("HELPS.Models.EmailVariable", b =>
                {
                    b.HasOne("HELPS.Models.Email")
                        .WithMany("variables")
                        .HasForeignKey("EmailId");
                });
#pragma warning restore 612, 618
        }
    }
}
