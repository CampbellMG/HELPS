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
    public class EmailsController : StudentUserController
    {
        public EmailsController(HelpsContext context) : base(context)
        {
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Email>>> GetAllEmails()
        {
            if (!IsAdmin()) return Unauthorized();

            return await Context.Emails.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Email>> GetEmail(int id)
        {
            if (!IsAdmin()) return Unauthorized();

            var email = await Context.Emails.FindAsync(id);

            if (email == null) return NotFound();

            return email;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmail(int id, [FromBody] Email email)
        {
            if (!IsAdmin()) return Unauthorized();

            if (id != email.Id) return NotFound();

            Context.Entry(email).State = EntityState.Modified;
            await Context.SaveChangesAsync();

            return NoContent();
        }
    }
}