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
    }
}