using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HELPS.Models;
using Microsoft.AspNetCore.Mvc;
using AppContext = System.AppContext;
using Microsoft.EntityFrameworkCore;

namespace HELPS.Controllers
{
    [Route("api/[controller]")]
    public class ReportController : Controller
    {
        private readonly HelpsContext _context;

        public ReportController(HelpsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Report>>> GetReports()
        {
            return await _context.Reports.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Report>> GetReport(int id)
        {
            var reportItem = await _context.Reports.FindAsync(id);

            if (reportItem == null)
            {
                return NotFound();
            }

            return reportItem;
        }

        [HttpPost]
        public async Task<ActionResult<Report>> PostReport(Report report)
        {
            _context.Reports.Add(report);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetReport), new { id = report.Id }, report);
        }

    }
}
