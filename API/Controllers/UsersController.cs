using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{ 
    [Authorize]
    public class UsersController(IUserRepository userRepository ,ILogger<UsersController> logger) : BaseApiController
    {
     
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers(){
            // var users = await userRepository.GetUsersAsync();//1
            // return Ok(mapper.Map<IEnumerable<MemberDto>>(users));//2
            var users = await userRepository.GetMembersDtoAsync();
            return Ok(users);
        }

       
        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username){
            // var user =await userRepository.GetUserByUsernameAsync(username);
            // logger.LogInformation("EF TEST");
            // if(user is null) return NotFound();
            // return mapper.Map<MemberDto>(user);//dto when return entity with include or return specific proprs
            var user =await userRepository.GetMemberDtoAsync(username);
            if(user == null) return NotFound();
            return  user;
        }
    }
}
