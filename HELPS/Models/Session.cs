namespace HELPS.Models
{
    public class Session
    {
        public int Id { get; set; }
        public string Starttime { get; set; }
        public int Duration { get; set; }
        public int RoomId { get; set; }
        public int AdvisorId { get; set; }
        public string AdvisorName { get; set; }
        public int StudentId { get; set; }
        public string Type { get; set; }
    }
}