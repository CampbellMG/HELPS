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
    //The Message class
    public class MessageController : Controller
    {
        private readonly HelpsContext _context;

        public MessageController(HelpsContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public List<Message> Messages()
        {
            return _context.Messages.ToList();
        }
        
    }
}