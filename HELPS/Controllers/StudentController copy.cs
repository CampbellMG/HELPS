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
    //Initial commit commentsssss
    public class StudentController : Controller
    {
        private readonly HelpsContext _context;

        public StudentController(HelpsContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public List<Student> Students()
        {
            return _context.Students.ToList();
        }
        
    }
}