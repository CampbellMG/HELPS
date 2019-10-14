using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace HELPS.Models
{
    public class Session
    {
        public Session()
        {
        }

        public Session(Session session)
        {
            Id = session.Id;
            Starttime = session.Starttime;
            Duration = session.Duration;
            RoomId = session.RoomId;
            AdvisorId = session.AdvisorId;
            AdvisorName = session.AdvisorName;
            StudentId = session.StudentId;
            Type = session.Type;
            AssignmentType = session.AssignmentType;
            GroupAssignment = session.GroupAssignment;
            Purpose = session.Purpose;
            SubjectName = session.SubjectName;
            Comments = session.Comments;
            FileIds = session.FileIds;
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [JsonProperty("startTime")] // TODO - rename this column
        public DateTime Starttime { get; set; }

        public int Duration { get; set; }
        public int RoomId { get; set; }
        public int AdvisorId { get; set; }
        public string AdvisorName { get; set; }
        public int StudentId { get; set; }
        public string Type { get; set; }
        public string AssignmentType { get; set; }
        public bool GroupAssignment { get; set; }
        public string Purpose { get; set; }
        public string SubjectName { get; set; }
        public string Comments { get; set; }
        public int[] FileIds { get; set; }
    }
}