using System;
using HELPS.Models;

namespace HELPS.Reports
{
    public abstract class AbstractReport
    {
        protected readonly HelpsContext Context;

        protected AbstractReport(HelpsContext context)
        {
            Context = context;
        }

        public abstract string GetTitle();
        public abstract ExtraField[] GetExtraFields();
        public abstract object GetData(DateTime startDate, DateTime endTime, dynamic extraData);
    }
}