using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace HELPS.Models
{
    public class Session
    {
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
    }
}