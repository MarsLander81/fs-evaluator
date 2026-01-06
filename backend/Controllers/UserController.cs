using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace task_manager_api.Controllers
{
    using TaskManager.Models;
    using TaskManager.Data;

    [Route("user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get(int id)
        {
            var user = await _context.Users.OrderBy(u => u.Id).ToListAsync();
            return Ok(user);
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] User user)
        {
            // Check for existing email
            if (await _context.Users.AnyAsync(u => u.Email == user.Email)) return Conflict("Email already in use.");
            
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = user.Id }, user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] User updated){
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();
            // Check for email conflict
            if (await _context.Users.AnyAsync(u => u.Email == updated.Email && u.Id != id)) return Conflict("Email already in use.");
            
            user.Email = updated.Email;
            user.PasswordHash = updated.PasswordHash;
            await _context.SaveChangesAsync();
            return Ok(user);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            _context.Users.Remove(user);
            // Also delete associated tasks
            var tasks = _context.Tasks.Where(t => t.UserId == id);
            _context.Tasks.RemoveRange(tasks);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
    
