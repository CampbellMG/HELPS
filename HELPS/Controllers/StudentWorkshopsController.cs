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
    public class StudentWorkshops : StudentUserController
    {
        public StudentWorkshops(HelpsContext context) : base(context)
        {
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Workshop>>> GetWorkshops()
        {
            return StudentWorkshops.Value.ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Workshop>> GetWorkshop(int id)
        {
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
            var studentIds = workshop.StudentIds.ToList();
            studentIds.Add(StudentUser.Value.Id);
            workshop.StudentIds = studentIds.ToArray();

            Context.Entry(workshop).State = EntityState.Modified;
            await Context.SaveChangesAsync();

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudentWorkshop(int id)
        {
            var workshop = await Context.Workshops.FindAsync(id);

            if (workshop == null) return NotFound();

            var studentIds = workshop.StudentIds.ToList();
            studentIds.Remove(StudentUser.Value.Id);
            workshop.StudentIds = studentIds.ToArray();
            
            Context.Entry(workshop).State = EntityState.Modified;
            await Context.SaveChangesAsync();

            return NoContent();
        }
    }
}