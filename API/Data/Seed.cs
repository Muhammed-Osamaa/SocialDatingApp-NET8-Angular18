using System;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public static class Seed
{
    public static  async Task SeedUsers(DataContext context){
        if(await context.Users.AnyAsync()) return;
        var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");
        var options = new JsonSerializerOptions(){PropertyNameCaseInsensitive =true};
        var users = JsonSerializer.Deserialize<List<AppUser>>(userData,options);
        if(users == null) return;
        foreach (var user in users)
        {
            user.UserName = user.UserName.ToLower();
            using var hmac = new HMACSHA512();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("password"));
            user.PasswordSalt = hmac.Key;
            await context.AddAsync(user);
        }
        await context.SaveChangesAsync();
    }
}
