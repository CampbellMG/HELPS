using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using HELPS.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HELPS.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class WorkshopsController : StudentUserController
    {
        public WorkshopsController(HelpsContext context) : base(context)
        {
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Workshop>>> GetWorkshops()
        {
            return Context.Workshops.ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Workshop>> GetWorkshop(int id)
        {
            if (IsAdmin())
            {
                var workshop = Context.Workshops.Find(id);
                if (workshop == null) return NotFound();
                return workshop;
            }

            try
            {
                return StudentWorkshops.Value.First(workshop => workshop.Id == id);
            }
            catch (InvalidOperationException)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<ActionResult<Workshop>> AddWorkshop([FromBody] Workshop workshop)
        {
            if (!IsAdmin()) return Unauthorized();

            Context.Workshops.Add(workshop);
            await Context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetWorkshop), new {id = workshop.Id}, workshop);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> AddWorkshop(int id, [FromBody] Workshop workshop)
        {
            if (!IsAdmin()) return Unauthorized();

            if (id != workshop.Id) return BadRequest();

            Context.Entry(workshop).State = EntityState.Modified;
            await Context.SaveChangesAsync();

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudentWorkshop(int id)
        {
            var workshop = await Context.Workshops.FindAsync(id);

            if (workshop == null) return NotFound();

            Context.Workshops.Remove(workshop);
            await Context.SaveChangesAsync();

            return NoContent();
        }
    }
}