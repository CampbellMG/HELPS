using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HELPS.Models
{
    public class student_workshops
    {
        public int id { get; set; }
        public string title { get; set; }
        public string time { get; set; } //ISO 8601, no fractional seconds
        public int duration { get; set; }
        public string room_id { get; set; }
        public string targetGroup { get; set; }
        public string description { get; set; }
        public int available_places { get; set; }
    }
}
