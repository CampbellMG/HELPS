using System;
using System.Linq;
using HELPS.Models;

namespace HELPS.Reports
{
    public class BookedSessions: AbstractReport
    {
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
            return _context.Sessions.Where(session =>
                session.Starttime > startDate && session.Starttime < endTime);
        }
    }
}