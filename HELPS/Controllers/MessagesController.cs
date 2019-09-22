using System.Collections.Generic;
using System.Threading.Tasks;
using HELPS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HELPS.Controllers
{
    [Route("api/[controller]")]
    //The Message class
    public class MessagesController : StudentUserController
    {
        public MessagesController(HelpsContext context) : base(context)
        {
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessages()
        {
            return await Context.Messages.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Message>> GetMessage(int id)
        {
            var message = await Context.Messages.FindAsync(id);

            if (message == null) return NotFound();

            return message;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMessage(int id, [FromBody] Message message)
        {
            if (!IsAdmin()) return Unauthorized();

            if (id != message.Id) return BadRequest();

            Context.Entry(message).State = EntityState.Modified;
            await Context.SaveChangesAsync();

            return NoContent();
        }
    }
}