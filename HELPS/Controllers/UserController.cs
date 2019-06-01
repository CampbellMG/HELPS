using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using HELPS.Services;
using HELPS.Models;
using System.Collections.Generic;

namespace HELPS.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/login")] 
    public class UsersController : ControllerBase
    {
        private IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]User userParam)
        {
            var user = _userService.Authenticate(userParam.Username, userParam.Password);

            if (user == null)
                return Unauthorized();

            var returndata = new { acessToken = user.Token, isAdmin = user.admin };
            return Ok(returndata);
        }


        //for testing only
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }
    }
}
