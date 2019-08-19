using System;
using HELPS.Models;

namespace HELPS.Reports
{
    public abstract class AbstractReport
    {
        private readonly HelpsContext _context;

        protected AbstractReport(HelpsContext context)
        {
            _context = context;
        }

        public abstract string GetTitle();
        public abstract object GetExtraFields();
        public abstract object GetData(DateTime startDate, DateTime endTime, dynamic extraData);
    }
}