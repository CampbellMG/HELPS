using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using HELPS.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using File = HELPS.Models.File;
using FileInfo = HELPS.Models.FileInfo;

namespace HELPS.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class FilesController : StudentUserController
    {

        public FilesController(HelpsContext context) : base(context)
        {
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFile(int id)
        {
                var file = Context.Files.First(currentFile => currentFile.Id == id);
                new FileExtensionContentTypeProvider().TryGetContentType(file.Name, out var contentType);
                return File(file.Data, contentType, file.Name);
        }

        [HttpPost]
        public async Task<ActionResult<FileInfo>> AddFile([FromForm] File file, IFormFile data)
        {
            using (var ms = new MemoryStream())
            {
                data.CopyTo(ms);
                file.Data = ms.ToArray();
            }
            
            Context.Files.Add(file);
            await Context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFile), new {id = file.Id}, file);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudentWorkshop(int id)
        {
            var file = await Context.Files.FindAsync(id);

            if (file == null) return NotFound();

            Context.Files.Remove(file);
            await Context.SaveChangesAsync();

            return NoContent();
        }
    }
}