using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HELPS.Models;
using Microsoft.AspNetCore.Mvc;

namespace HELPS.Controllers
{
    [Route("api/[controller]")]
    public class SWorkshopController : Controller
    {
        private readonly HelpsContext _context;

        public SWorkshopController(HelpsContext _context)
        {
            this._context = _context;
        }


    }
}
