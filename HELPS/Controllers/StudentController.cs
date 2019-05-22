using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HELPS.Models;
using Microsoft.AspNetCore.Mvc;
using AppContext = System.AppContext;

namespace HELPS.Controllers
{
    [Route("api/[controller]")]
    public class StudentController : Controller
    {
        private readonly HelpsContext _context;

        public StudentController(HelpsContext context)
        {
            _context = context;
        }

		/// <summary>
		/// Returns students in a JSON format
		/// Connect to https://localhost:PORT/api/student/
		/// </summary>
		/// <returns>JSON formatted list of students</returns>
		[HttpGet]
        public List<Student> GetAllStudents()
        {
            return _context.Students.ToList();
        }
        
    }
}