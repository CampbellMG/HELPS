using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using HELPS.Helpers;
using HELPS.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace HELPS.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        Task<User> Register(User user);
        Task<User> GetUser(int id);
        Task<User> GetUsername(string Username);
    }

    public class UserService : IUserService
    {
        private readonly HelpsContext _helpsContext;
        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings, HelpsContext helpsContext)
        {
            _helpsContext = helpsContext;
            _appSettings = appSettings.Value;
        }

        public User Authenticate(string username, string password)
        {
            var user =
                _helpsContext.Users.SingleOrDefault(x =>
                    x.Username == username && x.Password == password);

            if (user == null)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            // remove password before returning
            user.Password = null;

            return user;
        }

        public async Task<User> Register(User user)
        {
            _helpsContext.Users.Add(user);
            await _helpsContext.SaveChangesAsync();

            return user;
        }

        public async Task<User> GetUser(int id)
        {
            return await _helpsContext.Users.FindAsync(id);
        }

        public async Task<User> GetUsername(string username)
        {
            return await _helpsContext.Users.FirstOrDefaultAsync(user => user.Username == username);
        }
    }
}