using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HELPS.Models
{
    public class Workshop
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Time { get; set; } //ISO 8601, no fractional seconds
        public int Duration { get; set; }
        public int RoomId { get; set; }
        public string TargetGroup { get; set; }
        public string Description { get; set; }
        public int AvailablePlaces { get; set; }
        public int AdvisorId { get; set; }
        public int[] StudentIds { get; set; }
    } 
}
