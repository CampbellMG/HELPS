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
    public class SkillsController : StudentUserController
    {
        public SkillsController(HelpsContext context) : base(context)
        {
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Skill>>> GetAllSkills()
        {
            return Context.Skills.ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Skill>> GetSkill(int id)
        {
            var Skill = Context.Skills.Find(id);
            if (Skill == null) return NotFound();
            return Skill;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSkill(int id, [FromBody] Skill Skill)
        {
            if (!IsAdmin()) return Unauthorized();

            if (id != Skill.Id) return NotFound();

            Context.Entry(Skill).State = EntityState.Modified;
            await Context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Skill>> PostSkill([FromBody] Skill Skill)
        {
            Context.Skills.Add(Skill);
            await Context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSkill), new {id = Skill.Id}, Skill);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSkill(int id)
        {
            var Skill = await Context.Skills.FindAsync(id);

            if (Skill == null) return NotFound();

            Context.Skills.Remove(Skill);
            await Context.SaveChangesAsync();

            return NoContent();
        }
    }
}