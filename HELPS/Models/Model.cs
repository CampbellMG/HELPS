using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace HELPS.Models
{
    public class HelpsContext : DbContext
    {
        public HelpsContext(DbContextOptions<HelpsContext> options)
            : base(options)
        { }

        public DbSet<Student> Students { get; set; }
        public DbSet<Report> Reports { get; set; }
    }

    public class Student
    {
        public int StudentId { get; set; }
        public string Name { get; set; }
    }

    public class Report
    {
        public string From { get; set; }
        public string To { get; set; }
        public int Id { get; set; }
        public string SkillSet { get; set; }
        public string Topic { get; set; }
        public int SessionId { get; set; }
        public bool Generate { get; set; }
    }
}
