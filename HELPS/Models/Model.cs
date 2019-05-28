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
    }

    public class Student
    {
        public int StudentId { get; set; }
        public string Name { get; set; }
		public string BestContactNumber { get; set; }
	}
}