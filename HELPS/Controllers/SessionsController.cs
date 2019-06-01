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
        public async Task<ActionResult<IEnumerable<Session>>> GetSessions()
        {
            return await _context.Sessions.ToListAsync();
        }

        [HttpGet("{Id}")]
        async Task<ActionResult<IEnumerable<Session>>> GetSessions(int id)
        {
            var todoItem = await _context.Sessions.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return await GetSessions(id);
        }

        [HttpPost("{Id}")]
        public async Task<ActionResult<Session>> PostSession(Session session)
        {
            _context.Sessions.Add(session);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSessions), new { id = session.Id }, session);
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> PutSessions(int id, Session session)
        {
            if (id != session.Id)
            {
                return BadRequest();
            }

            _context.Entry(session).State = EntityState.Modified;
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
