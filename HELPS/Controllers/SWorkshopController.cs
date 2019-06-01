using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HELPS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HELPS.Controllers
{
    [Route("api/student/workshops")]
    public class SWorkshopController : Controller
    {
        private readonly HelpsContext _context;

        public SWorkshopController(HelpsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<student_workshops>>> GetstudentWorkshop()
        {
            return await _context.s_workshop.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<student_workshops>> GetstudentWorkshop(int id)
        {
            var todoItem = await _context.s_workshop.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<student_workshops>> postStudentWorkshop(student_workshops studentworkshop)
        {
            _context.s_workshop.Add(studentworkshop);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetstudentWorkshop), new { id = studentworkshop.Id }, studentworkshop);
        }

        [HttpPut]
        public async Task<IActionResult> PutStudentWorkshop(int id, student_workshops studentworkshop)
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
            var todoItem = await _context.s_workshop.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            _context.s_workshop.Remove(todoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}