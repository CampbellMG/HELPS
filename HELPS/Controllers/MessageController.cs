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
    //The Message class
    public class MessageController : Controller
    {
        private readonly HelpsContext _context;

        public MessageController(HelpsContext context)
        {
            _context = context;
        }

           [HttpGet("[action]")]
           public List<Message> Messages()
           {
               return _context.Messages.ToList();
           }



        // Edited from here...
            [HttpGet]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessages()
        {
            return await _context.Messages.ToListAsync();
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Message>> GetMessage(int id)
        {
            var toDoItem = await _context.Messages.FindAsync(id);

            if (toDoItem == null)
            {
                return NotFound();
            }
            return toDoItem;
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> PutMessage(int id, [FromBody] Message message)
        {
            if (id != message.MessageId)
            {
                return BadRequest();
            }
            _context.Entry(message).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Message>> PostMessage([FromBody] Message message)
        {
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMessage),new { id = message.MessageId}, message);

        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteMessage(int id)
        {
            var todoItem = await _context.Messages.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }
            _context.Messages.Remove(todoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // to here.



    }
}