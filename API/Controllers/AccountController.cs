using System;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(DataContext context, ITokenService tokenService) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await UserExists(registerDto.Username))
        {       
            return BadRequest("The username is taken before");
        }
        if (string.IsNullOrEmpty(registerDto.Username)){
            return BadRequest("username is not valid");
        }
          if (string.IsNullOrEmpty(registerDto.Password)){
            return BadRequest("Password is not valid");
        }
        if (string.IsNullOrEmpty(registerDto.Password) && string.IsNullOrEmpty(registerDto.Username)){
            return BadRequest("username and Password are not valid");
        }
        // using var hash = new HMACSHA512();
        // var user = new AppUser()
        // {
        //     UserName = registerDto.Username.ToLower(),
        //     PasswordHash = hash.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
        //     PasswordSalt = hash.Key
        // };
        // await context.Users.AddAsync(user);
        // await context.SaveChangesAsync();
        // return new UserDto()
        // {
        //     Username = user.UserName,
        //     Token = tokenService.CreateToken(user)
        // };
        return Ok();
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await context.Users
            .Include(x=>x.Photos)
            .FirstOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());
        if (user == null) return Unauthorized("Invalid User Name");
        using var hmac = new HMACSHA512(user.PasswordSalt);
        var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
        for (int i = 0; i < computeHash.Length; i++)
        {
            if (computeHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
        }
        return new UserDto()
        {
            Username = user.UserName,
            Token = tokenService.CreateToken(user),
            PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url
        };
    }


    private async Task<bool> UserExists(string username)
    {
        return await context.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower());
    }
}
