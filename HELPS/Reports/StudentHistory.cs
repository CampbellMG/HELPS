using System;
using System.Linq;
using HELPS.Models;

namespace HELPS.Reports
{
    
    public class StudentHistory : AbstractReport
    {
        private const string IdentifierStudentId = "student_id";

        public StudentHistory(HelpsContext context) : base(context)
        {
        }

        public override string GetTitle()
        {
            return "Student History";
        }

        public override ExtraField[] GetExtraFields()
        {
            return new []
            {
                new ExtraField(IdentifierStudentId, "Student", new ExtraField.ExtraFieldOption[0])
            };
        }

        public override object GetData(DateTime startDate, DateTime endTime, dynamic extraData)
        {
            int studentId = extraData[IdentifierStudentId];
            
            return from session in Context.Sessions
                join room in Context.Rooms on session.RoomId equals room.Id
                join advisor in Context.Advisors on session.AdvisorId equals advisor.Id
                join student in Context.Students on session.StudentId equals student.Id
                where session.Starttime > startDate && session.Starttime < endTime && session.StudentId == studentId
                select new StudentHistoryResult(
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