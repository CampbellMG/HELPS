using System.Collections.Generic;
using System.Threading.Tasks;
using HELPS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HELPS.Controllers
{
    [Route("api/[controller]")]
    public class SWorkshopController : Controller
    {
        private readonly HelpsContext _context;

        public SWorkshopController(HelpsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Workshop>>> GetstudentWorkshop()
        {
            return await _context.Workshops.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Workshop>> GetstudentWorkshop(int id)
        {
            var todoItem = await _context.Workshops.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Workshop>> postStudentWorkshop(Workshop studentworkshop)
        {
            _context.Workshops.Add(studentworkshop);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetstudentWorkshop), new {id = studentworkshop.Id},
                studentworkshop);
        }

        [HttpPut]
        public async Task<IActionResult> PutStudentWorkshop(int id, Workshop studentworkshop)
        {
            if (id != studentworkshop.Id)
            {
                return BadRequest();
            }

            _context.Entry(studentworkshop).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudentWorkshop(int id)
        {
            var todoItem = await _context.Workshops.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            _context.Workshops.Remove(todoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}