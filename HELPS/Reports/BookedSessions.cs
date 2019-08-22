using System;
using System.Linq;
using HELPS.Models;

namespace HELPS.Reports
{
    
    public class BookedSessions : AbstractReport
    {

        public BookedSessions(HelpsContext context) : base(context)
        {
        }

        public override string GetTitle()
        {
            return "Booked Sessions";
        }

        public override ExtraField[] GetExtraFields()
        {
            return new ExtraField[0];
        }

        public override object GetData(DateTime startDate, DateTime endTime, dynamic extraData)
        {
            return from session in Context.Sessions
                join room in Context.Rooms on session.RoomId equals room.Id
                join advisor in Context.Advisors on session.AdvisorId equals advisor.Id
                join student in Context.Students on session.StudentId equals student.Id
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