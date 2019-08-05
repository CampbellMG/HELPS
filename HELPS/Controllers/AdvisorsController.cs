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
    public class AdvisorsController : StudentUserController
    {
        public AdvisorsController(HelpsContext context) : base(context)
        {
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Advisor>>> GetAdvisors()
        {
            return !IsAdmin() ? StudentAdvisors.Value.ToList() : Context.Advisors.ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Advisor>> GetAdvisor(int id)
        {
            if (IsAdmin())
            {
                var advisor = Context.Advisors.Find(id);
                if (advisor == null) return NotFound();
                return advisor;
            }


            try
            {
                return StudentAdvisors.Value.First(advisor => advisor.Id == id);
            }
            catch (InvalidOperationException)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<Advisor>>> AddAdvisor([FromBody] Advisor advisor)
        {
            if (!IsAdmin()) return Unauthorized();

            Context.Advisors.Add(advisor);
            await Context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAdvisors), new {id = advisor.Id}, advisor);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdvisor(int id, Advisor advisor)
        {
            if (!IsAdmin()) return Unauthorized();

            if (id != advisor.Id) return BadRequest();

            Context.Entry(advisor).State = EntityState.Modified;
            await Context.SaveChangesAsync();

            return NoContent();
        }
    }
}