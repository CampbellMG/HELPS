using HELPS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HELPS.Controllers
{
    [Route("api/[controller]")]
    public class SessionsController : Controller
    {
        private readonly HelpsContext _context;

        public SessionsController(HelpsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sessions>>> GetSessions()
        {
            return await _context.Sessions.ToListAsync();
        }

        [HttpGet("{Id}")]
        async Task<ActionResult<IEnumerable<Sessions>>> GetSessions(int Id)
        {
            var todoItem = await _context.Sessions.FindAsync(Id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return await GetSessions(Id);
        }

        [HttpPost("{Id}")]
        public async Task<ActionResult<Sessions>> PostSession(Sessions sessions)
        {
            _context.Sessions.Add(sessions);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSessions), new { id = sessions.Id }, sessions);
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> PutSessions(int Id, Sessions sessions)
        {
            if (Id != sessions.Id)
            {
                return BadRequest();
            }

            _context.Entry(Id).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteSessions(int Id)
        {
            var todoItem = await _context.Sessions.FindAsync(Id);

            if (todoItem == null)
            {
                return NotFound();
            }

            _context.Sessions.Remove(todoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
