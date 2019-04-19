using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HELPS.Models;
using Microsoft.AspNetCore.Mvc;

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
        public String Get(int id)
        {
            return "function get";
        }

        //api/student/workshops/id
        [HttpPost]
        public String post(int id)
        {
            return "function post";
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
