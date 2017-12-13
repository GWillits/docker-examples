using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FakeSite.Controllers
{
    public class LoginDetails
    {
        public string username;
        public string password;
    }

    public class User
    {
        public string fullname;
    }
    [Route("api/[controller]")]
    [DisableCors]
    public class AuthController : Controller
    {

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody] LoginDetails logindetails)
        {
            if (logindetails.username ==  "sc" && logindetails.password ==  "hohoho")
            {
               return Ok(new User(){fullname= "Santa Claus" }); 
            }
            return new UnauthorizedResult();
        }


    }
}
