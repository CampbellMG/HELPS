using System.Threading.Tasks;
using HELPS.Models;
using HELPS.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HELPS.Controllers
{
    [Route("api")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public IActionResult Authenticate([FromBody] User userParam)
        {
            var user = _userService.Authenticate(userParam.Username, userParam.Password);

            if (user == null)
                return Unauthorized();

            return Ok(new {accessToken = user.Token, user.isAdmin});
        }
        
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register([FromBody] User user)
        {
            user = await _userService.Register(user);
            
            return CreatedAtAction(nameof(GetUser), new {id = user.Id}, user);
        }

        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _userService.GetUser(id);
            
            if (user == null)
            {
                return NotFound();
            }

            return user;
        }
    }
}