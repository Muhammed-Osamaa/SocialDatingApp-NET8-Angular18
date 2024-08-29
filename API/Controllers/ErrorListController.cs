using API.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.ErrorTesting
{
    public class ErrorListController : BaseApiController
    {
        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetAuth(){
            return "secrect text";
        }

        [HttpGet("not-found")]
        public ActionResult<string> GetNotFound(){
            return NotFound();
        }

       [HttpGet("server-error")]
        public ActionResult<string> GetServerError(){
           throw new Exception("a bad thing has happend");
        }

       [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest(){
            return BadRequest("this was a bad request");
        }
    }
}
