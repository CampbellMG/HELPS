using System.Collections.Generic;
using System.Threading.Tasks;
using HELPS.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HELPS.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ReportsController : StudentUserController
    {
        public class GenerateReport
        {
            public string SkillSet { get; set; }
            public int SessionId { get; set; }
            public string StartTime { get; set; }
            public string EndTime { get; set; }
            public string Campus { get; set; }
            public string Lecturer { get; set; }
            public string Type { get; set; }
            public string BookedBy { get; set; }
            public string PreferredFirstName { get; set; }
            public int StudentId { get; set; }
            public string Faculty { get; set; }
            public string Status { get; set; }
            public string Degree { get; set; }
            public string DegreeDetails { get; set; }
            public bool Attended { get; set; }
            public string SubjectName { get; set; }
        }

        public ReportsController(HelpsContext context) : base(context)
        {
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Report>>> GetReports()
        {
            if (!IsAdmin()) return Unauthorized();

            return await Context.Reports.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Report>> GetReport(int id)
        {
            if (!IsAdmin()) return Unauthorized();

            var reportItem = await Context.Reports.FindAsync(id);

            if (reportItem == null) return NotFound();

            return reportItem;
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<GenerateReport>>> PostReport([FromBody] Report report)
        {
            if (!IsAdmin()) return Unauthorized();

            Context.Reports.Add(report);
            await Context.SaveChangesAsync();

            var generateReport = new List<GenerateReport>();

            //var workshops = await Context.Workshops.ToListAsync();

            // look for workshop entries that have matching attributes in request
            // TODO: look for session entries that have matching attributes in request
            if (report.Generate) {
                foreach (var workshop in await Context.Workshops.ToListAsync())
                {
                    if (workshop.SkillSet == report.SkillSet) // TODO: check other workshop attributes. see https://youtu.be/RucrASRk9NA.
                        generateReport.Add(
                            new GenerateReport {
                                SkillSet = workshop.SkillSet
                            }
                        );
                }
                return generateReport;
            }

            return CreatedAtAction(nameof(GetReport), new { id = report.Id }, report);
        }
    }
}
