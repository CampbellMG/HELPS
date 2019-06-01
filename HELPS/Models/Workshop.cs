using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HELPS.Models
{
    public class Workshop
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Time { get; set; } //ISO 8601, no fractional seconds
        public int Duration { get; set; }
        public string Room_id { get; set; }
        public string TargetGroup { get; set; }
        public string Description { get; set; }
        public int Available_places { get; set; }
    }
}
