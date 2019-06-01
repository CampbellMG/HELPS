namespace HELPS.Models
{
    public class Email
    {
        public int Id { get; set; }
        public int Title { get; set; }
        public string Content { get; set; }
        public EmailVariable[] variables { get; set; }
    }

    public class EmailVariable
    {
        public int Id { get; set; }
        public string Variable { get; set; }
        public string Example { get; set; }
    }
}