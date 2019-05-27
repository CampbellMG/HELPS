using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HELPS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HELPS.Controllers
{
    [Route("api/student/workshops")]
    public class SWorkshopController : Controller
    {
        private readonly HelpsContext _context;

        public SWorkshopController(HelpsContext _context)
        {
            this._context = _context;
        }

        //api/student/workshops/id
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
        public async Task<ActionResult<student_workshops>> postStudentWorkshop(student_workshops studentworkshop)
        {
            _context.s_workshop.Add(studentworkshop);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetstudentWorkshop), new { id = studentworkshop.id }, studentworkshop);
        }

        //api/student/workshops/id
        [HttpPut]
        public void Put(int id)
        {
            
        }

        //api/student/workshops/id
        [HttpDelete]
        public void delete()
        {
            
        }
    }
}
