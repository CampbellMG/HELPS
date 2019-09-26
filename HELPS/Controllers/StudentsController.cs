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
        
        [HttpGet("workshops")]
        public async Task<ActionResult<IEnumerable<Workshop>>> GetStudentWorkshops()
        {
            return StudentWorkshops.Value.ToList();
        }
        
        [HttpPost("workshops")]
        public async Task<IActionResult> BookWorkshop([FromBody] Workshop workshop)
        {
            if (workshop.StudentIds == null)
            {
                workshop.StudentIds = new []{Student.Value.Id};
            }
            else
            {
                IList<int> studentIds = workshop.StudentIds.ToList();
                studentIds.Add(Student.Value.Id);
                workshop.StudentIds = studentIds.ToArray();
            }

            
            Context.Entry(workshop).State = EntityState.Modified;
            await Context.SaveChangesAsync();
            
            return NoContent();
        }
        
        [HttpDelete("workshops/{id}")]
        public async Task<IActionResult> CancelWorkshop(int id)
        {
            Workshop workshop = await Context.Workshops.FindAsync(id);
            int userId = Student.Value.Id;

            if (workshop?.StudentIds == null || !workshop.StudentIds.Contains(userId))
            {
                return NotFound();
            }

            workshop.StudentIds = workshop.StudentIds.Where(studentId => studentId != userId).ToArray();
            
            Context.Entry(workshop).State = EntityState.Modified;
            await Context.SaveChangesAsync();
            
            return NoContent();
        }
        
        [HttpGet("sessions")]
        public async Task<ActionResult<IEnumerable<Session>>> GetStudentSessions()
        {
            return StudentSessions.Value.ToList();
        }
        
        [HttpPost("sessions")]
        public async Task<IActionResult> BookSession([FromBody] Session session)
        {
            session.StudentId = Student.Value.Id;
            
            Context.Entry(session).State = EntityState.Modified;
            await Context.SaveChangesAsync();
            
            return NoContent();
        }
        
        [HttpDelete("sessions/{id}")]
        public async Task<IActionResult> CancelSession(int id)
        {
            Session session = await Context.Sessions.FindAsync(id);

            if (session?.StudentId == null || session.StudentId != Student.Value.Id)
            {
                return NotFound();
            }

            session.StudentId = -1;
            
            Context.Entry(session).State = EntityState.Modified;
            await Context.SaveChangesAsync();
            
            return NoContent();
        }
    }
}