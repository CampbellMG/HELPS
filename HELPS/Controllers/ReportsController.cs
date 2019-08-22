using System;
using System.Collections.Generic;
using System.Linq;
using HELPS.Models;
using HELPS.Reports;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CSharp.RuntimeBinder;

namespace HELPS.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ReportsController : StudentUserController
    {
        private readonly IDictionary<int, AbstractReport> _reports;

        public ReportsController(HelpsContext context) : base(context)
        {
            _reports = new Dictionary<int, AbstractReport>
            {
                {0, new BookedSessions(context)},
                {1, new StudentHistory(context)}
            };
        }

        [HttpGet] 
        public ActionResult<IEnumerable<ReportListItem>> GetReports()
        {
            if (!IsAdmin()) return Unauthorized();
            
            return _reports
                .Select(idToReport => new ReportListItem(
                    idToReport.Key,
                    idToReport.Value.GetTitle(),
                    idToReport.Value.GetExtraFields()
                ))
                .ToList();
        }

        [HttpPost]
        public ActionResult<object> GenerateReport([FromBody] dynamic data)
        {
            if (!IsAdmin()) return Unauthorized();

            try
            {
                var from = DateTime.Parse((string)data.from);
                var to = DateTime.Parse((string)data.to);
                var id = (int) data.report;
                
                return _reports[id].GetData(
                    from,
                    to,
                    data
                );
            }
            catch (Exception e)
            {
                if (e is RuntimeBinderException || e is ArgumentException)
                {
                    return BadRequest();    
                }

                throw;
            }
            
        }
    }
}