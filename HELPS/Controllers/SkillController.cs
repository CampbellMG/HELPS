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
    //The Message class
    public class SkillController : StudentUserController
    {
        public SkillController(HelpsContext context) : base(context)
        {
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Skill>>> GetSkills()
        {
            if (!IsAdmin()) return Unauthorized();

            return await Context.Skills.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Skill>> GetSkill(int id)
        {
            if (!IsAdmin()) return Unauthorized();

            var skill = await Context.Skills.FindAsync(id);

            if (skill == null) return NotFound();

            return skill;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSkill(int id, [FromBody] Skill skills)
        {
            if (!IsAdmin()) return Unauthorized();

            if (id != skills.Id) return BadRequest();

            Context.Entry(skills).State = EntityState.Modified;
            await Context.SaveChangesAsync();

            return NoContent();
        }
    }
}