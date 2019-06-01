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
    public class StudentsController : StudentUserController
    {
        public StudentsController(HelpsContext context) : base(context)
        {
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetAllStudents()
        {
            return IsAdmin() ? Context.Students.ToList() : new List<Student> {Student.Value};
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            var student = IsAdmin() ? Context.Students.Find(id) : Student.Value;

            if (student == null) return NotFound();

            return student;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudent(int id, [FromBody] Student student)
        {
            if (id != student.Id) return NotFound();

            Context.Entry(student).State = EntityState.Modified;
            await Context.SaveChangesAsync();

            return NoContent();
        }
    }
}