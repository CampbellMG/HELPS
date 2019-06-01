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
        public DbSet<student_workshops> s_workshop { get; set; }
        public DbSet<Report> Reports { get; set; }
       
        public DbSet<Message> Messages { get; set; }

        public DbSet<Advisor> Advisors { get; set; }
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


    public class Message
    {
        public int MessageId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }




		public string RegisteredDate { get; set; }
		public string PrefFirstName { get; set; }
		public string Faculty { get; set; }
		public string Course { get; set; }
		public string Email { get; set; }
		public string HomePhone { get; set; }
		public string MobileNumber { get; set; }
		public string BestContactNumber { get; set; }
		public string DOB { get; set; }
		public string Gender { get; set; }
		public string Degree { get; set; }
		public string Year { get; set; }
		public string Status { get; set; }
		public string FirstLanguage { get; set; }
		public string CountryOfOrigin { get; set; }
		public string EducationalBackground { get; set; }
		public bool HasCompletedCAF { get; set; }
		public bool IsSpecialNeeds { get; set; }
		public string Other { get; set; }

	}

    public class Advisor
    {
        public int Id { get; set; }
        public string Email{ get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsActive { get; set; }
    }
}
