using System;
using Newtonsoft.Json;

namespace HELPS.Models
{
    public class ExtraField
    {
        public class ExtraFieldOption
        {
            public string identifier;
            public string value;

            public ExtraFieldOption(string identifier, string value)
            {
                this.identifier = identifier;
                this.value = value;
            }
        }

        public string identifier;
        public string title;
        public ExtraFieldOption[] options; // Empty options means free form text

        public ExtraField(string identifier, string title, ExtraFieldOption[] options)
        {
            this.identifier = identifier;
            this.title = title;
            this.options = options;
        }
    }

    public class ReportListItem
    {
        public int id;
        public string title;
        public object extraFields;

        public ReportListItem(int id, string title, object extraFields)
        {
            this.id = id;
            this.title = title;
            this.extraFields = extraFields;
        }
    }

    public class BookedSessionResult
    {
        [JsonProperty("ID")] private string _id;
        [JsonProperty("Start Time")] private string _start;
        [JsonProperty("End Time")] private string _end;
        [JsonProperty("Room")] private string _room;
        [JsonProperty("Advisor")] private string _advisor;
        [JsonProperty("Student")] private string _student;
        [JsonProperty("Type")] private string _type;

        public BookedSessionResult(string id, DateTime start, int duration, string room,
            string advisor, string student, string type)
        {
            _id = id;
            _start = start.ToString("MM/dd/yyyy hh:mm tt");
            _end = start.Add(new TimeSpan(duration, 0, 0)).ToString("MM/dd/yyyy hh:mm tt");
            _room = room;
            _advisor = advisor;
            _student = student;
            _type = type;
        }
    }

    public class CancelledSessionResult
    {
    }

    public class StudentHistoryResult
    {
        [JsonProperty("ID")] private string _id;
        [JsonProperty("Start Time")] private string _start;
        [JsonProperty("End Time")] private string _end;
        [JsonProperty("Room")] private string _room;
        [JsonProperty("Advisor")] private string _advisor;
        [JsonProperty("Student")] private string _student;
        [JsonProperty("Type")] private string _type;

        public StudentHistoryResult(string id, DateTime start, int duration, string room,
            string advisor, string student, string type)
        {
            _id = id;
            _start = start.ToString("MM/dd/yyyy hh:mm tt");
            _end = start.Add(new TimeSpan(duration, 0, 0)).ToString("MM/dd/yyyy hh:mm tt");
            _room = room;
            _advisor = advisor;
            _student = student;
            _type = type;
        }
    }
}