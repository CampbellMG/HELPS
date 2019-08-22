using System;
using HELPS.Models;

namespace HELPS.Reports
{
    public class CancelledSessions : AbstractReport
    {
        public CancelledSessions(HelpsContext context) : base(context)
        {
        }

        public override string GetTitle()
        {
            return "Cancelled Sessions";
        }

        public override ExtraField[] GetExtraFields()
        {
            return new ExtraField[0];
        }

        public override object GetData(DateTime startDate, DateTime endTime, dynamic extraData)
        {
            return new CancelledSessionResult[0];
        }
    }
}