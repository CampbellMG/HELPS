using Microsoft.EntityFrameworkCore;

namespace HELPS.Models
{
    public class HelpsContext : DbContext
    {
        public HelpsContext(DbContextOptions<HelpsContext> options)
            : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Workshop> Workshops { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Advisor> Advisors { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Email> Emails { get; set; }
    }
}