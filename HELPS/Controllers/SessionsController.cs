using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HELPS.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace HELPS.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class SessionsController : StudentUserController
    {
        public class SessionResult : Session
        {
            [JsonProperty("files")]
            private FileInfo[] _files;
            
            public SessionResult(Session session, FileInfo[] files) : base(session)
            {
                this._files = files;
            }
        }
        
        public SessionsController(HelpsContext context) : base(context)
        {
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SessionResult>>> GetSessions()
        {
            var sessions = IsAdmin() ? Context.Sessions.ToList() : StudentSessions.Value.ToList();
            return sessions.Select(session =>
            {
                var files = GetSessionFiles(session);
                return new SessionResult(session, files);
            }).ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SessionResult>> GetSession(int id)
        {
            if (IsAdmin())
            {
                var session = Context.Sessions.Find(id);
                if (session == null) return NotFound();
                var files = GetSessionFiles(session);
                return new SessionResult(session, files);
            }

            try
            {
                var session = StudentSessions.Value.First(selectedSession => selectedSession.Id == id);
                var files = GetSessionFiles(session);
                return new SessionResult(session, files);
            }
            catch (InvalidOperationException)
            {
                return NotFound();
            }
        }
        
        private FileInfo[] GetSessionFiles(Session session)
        {
            return Context.Files
                .Where(file => Array.Exists(session.FileIds, fileId => fileId == file.Id))
                .Select(file => new FileInfo(file.Id, file.Name))
                .ToArray();
        }

        [HttpPost]
        public async Task<ActionResult<Session>> PostSession([FromBody]Session session)
        {
            if (!IsAdmin()) return Unauthorized();

            Context.Sessions.Add(session);
            await Context.SaveChangesAsync();


            return CreatedAtAction(nameof(GetSessions), new {id = session.Id}, session);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSessions(int id, [FromBody] Session session)
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