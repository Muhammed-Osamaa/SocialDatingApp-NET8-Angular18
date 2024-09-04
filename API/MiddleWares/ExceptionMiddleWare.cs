using System;
using System.Net;
using System.Text.Json;
using API.Errors;

namespace API.MiddleWares;

public class ExceptionMiddleWare(RequestDelegate next,ILogger<ExceptionMiddleWare> logger, IHostEnvironment hostEnvironment)
{
     public async Task InvokeAsync(HttpContext context){
        try
        {
            logger.LogInformation("No Global Excetion");
           await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex , ex.Message);
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            context.Response.ContentType = "application/json";

            var response = hostEnvironment.IsDevelopment()?new ApiException(context.Response.StatusCode,ex.Message,ex.StackTrace):
            new ApiException(context.Response.StatusCode,ex.Message,"Internal Server Error!");
            var json = JsonSerializer.Serialize(response,new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase});
            await context.Response.WriteAsync(json);
        }
     }
}
