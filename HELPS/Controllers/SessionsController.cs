using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HELPS.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HELPS.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class SessionsController : StudentUserController
    {
        public SessionsController(HelpsContext context) : base(context)
        {
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Session>>> GetSessions()
        {
            return IsAdmin() ? Context.Sessions.ToList() : StudentSessions.Value.ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Session>> GetSession(int id)
        {
            if (IsAdmin())
            {
                var session = Context.Sessions.Find(id);
                if (session == null) return NotFound();
                return session;
            }

            try
            {
                return StudentSessions.Value.First(session => session.Id == id);
            }
            catch (InvalidOperationException)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<ActionResult<Session>> PostSession(Session session)
        {
            if (!IsAdmin()) return Unauthorized();

            Context.Sessions.Add(session);
            await Context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSessions), new {id = session.Id}, session);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSessions(int id, Session session)
        {
            if (!IsAdmin()) return Unauthorized();

            if (id != session.Id) return BadRequest();

            Context.Entry(session).State = EntityState.Modified;
            await Context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSessions(int id)
        {
            if (!IsAdmin()) return Unauthorized();

            var todoItem = await Context.Sessions.FindAsync(id);

            if (todoItem == null) return NotFound();

            Context.Sessions.Remove(todoItem);
            await Context.SaveChangesAsync();

            return NoContent();
        }
    }
}