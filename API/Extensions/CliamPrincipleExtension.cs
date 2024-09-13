using System;
using System.Security.Claims;

namespace API.Extensions;

public static class CliamPrincipleExtension
{
    public static string GetUsername(this ClaimsPrincipal user){
        var username = user.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("Cannot Get Username From Token");
        return username;
    }
}
