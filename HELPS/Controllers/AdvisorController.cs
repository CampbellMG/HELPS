using System.Collections.Generic;
using System.Threading.Tasks;
using HELPS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HELPS.Controllers
{
    [Route("api/advisor")]
    [ApiController]
    public class AdvisorController : ControllerBase
    {
        private readonly HelpsContext _context;

        public AdvisorController(HelpsContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Advisor>>> GetAdvisors()
        {
            return await _context.Advisors.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<Advisor>>> AddAdvisor(Advisor advisor)
        {
            _context.Advisors.Add(advisor);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAdvisors), new { id = advisor.Id }, advisor);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdvisor (int id, Advisor advisor)
        {
            if (id != advisor.Id)
            {
                return BadRequest();
            }

            _context.Entry(advisor).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}