using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HELPS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AppContext = System.AppContext;

namespace HELPS.Controllers
{
    [Route("api/[controller]")]

    public class StudentController : Controller
    {
        private readonly HelpsContext _context;
	[Route("api/[controller]")]
	public class StudentController : Controller
	{
		private readonly HelpsContext _context;

		public StudentController(HelpsContext context)
		{
			_context = context;
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<Student>> GetStudent(int id)
		{
			var student = await _context.Students.FindAsync(id);
			
			if (student == null)
			{
				return NotFound();
			}

			return student;
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> PutStudent(int id, [FromBody] Student student)
		{
			if (id != student.StudentId)
			{
				return NotFound();
			}

			_context.Entry(student).State = EntityState.Modified;
			await _context.SaveChangesAsync();

			return NoContent();
		}

		/// <summary>
		/// Returns students in a JSON format
		/// Connect to https://localhost:PORT/api/student/
		/// </summary>
		/// <returns>JSON formatted list of students</returns>
		[HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetAllStudents()
        {
            return await _context.Students.ToListAsync();
        }
    }
}