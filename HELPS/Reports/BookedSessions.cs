using System;
using System.Collections.Generic;
using System.Linq;
using HELPS.Models;
using Newtonsoft.Json;

namespace HELPS.Reports
{
    
    public class BookedSessions : AbstractReport
    {
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
        
        private readonly HelpsContext _context;

        public BookedSessions(HelpsContext context) : base(context)
        {
            _context = context;
        }

        public override string GetTitle()
        {
            return "Booked Sessions";
        }

        public override object GetExtraFields()
        {
            return new { };
        }

        public override object GetData(DateTime startDate, DateTime endTime, dynamic extraData)
        {
            return from session in _context.Sessions
                join room in _context.Rooms on session.RoomId equals room.Id
                join advisor in _context.Advisors on session.AdvisorId equals advisor.Id
                join student in _context.Students on session.StudentId equals student.Id
                where session.Starttime > startDate && session.Starttime < endTime
                select new BookedSessionResult(
                    session.Id.ToString(),
                    session.Starttime,
                    session.Duration,
                    room.Title,
                    $"{advisor.FirstName} {advisor.LastName}",
                    student.Name,
                    session.Type
                );
        }
    }
}