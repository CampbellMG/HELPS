using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using HELPS.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HELPS.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class RoomsController : StudentUserController
    {
        public RoomsController(HelpsContext context) : base(context)
        {
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Room>>> GetAllRooms()
        {
            return !IsAdmin() ? StudentRooms.Value.ToList() : Context.Rooms.ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Room>> GetRoom(int id)
        {
            if (IsAdmin())
            {
                var room = Context.Rooms.Find(id);
                if (room == null) return NotFound();
                return room;
            }

            try
            {
                return StudentRooms.Value.First(room => room.Id == id);
            }
            catch (InvalidOperationException)
            {
                return NotFound();
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutRoom(int id, [FromBody] Room room)
        {
            if (!IsAdmin()) return Unauthorized();

            if (id != room.Id) return NotFound();

            Context.Entry(room).State = EntityState.Modified;
            await Context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Room>> PostRoom([FromBody] Room room)
        {
            Context.Rooms.Add(room);
            await Context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRoom), new {id = room.Id}, room);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            var room = await Context.Rooms.FindAsync(id);

            if (room == null) return NotFound();

            Context.Rooms.Remove(room);
            await Context.SaveChangesAsync();

            return NoContent();
        }
    }
}