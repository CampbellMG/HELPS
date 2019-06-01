namespace HELPS.Models
{
    public class Report
    {
        public int Id { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string SkillSet { get; set; }
        public string Topic { get; set; }
        public int SessionId { get; set; }
        public bool Generate { get; set; }
    }
}