﻿// <auto-generated />
using HELPS.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace HELPS.Migrations
{
    [DbContext(typeof(HelpsContext))]
    [Migration("20190528104231_StudentPropertiesComplete")]
    partial class StudentPropertiesComplete
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.2.3-servicing-35854")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("HELPS.Models.Student", b =>
                {
                    b.Property<int>("StudentId")
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

                    b.HasKey("StudentId");

                    b.ToTable("Students");
                });
#pragma warning restore 612, 618
        }
    }
}