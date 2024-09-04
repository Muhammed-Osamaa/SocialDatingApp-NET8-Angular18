using System.Text;
using API.Data;
using API.Extensions;
using API.MiddleWares;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAppliciationServices(builder.Configuration);
builder.Services.AddIdentityService(builder.Configuration);

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleWare>();

app.UseHttpsRedirection();

app.MapControllers();

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200","https://localhost:4200"));

app.UseAuthentication();

app.UseAuthorization();

app.Services.CreateScope();

using var scop = app.Services.CreateScope();
try
{
    var context = scop.ServiceProvider.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedUsers(context);
    app.Logger.LogInformation("ALL Migration and DB is done");

}
catch (Exception ex)
{
    var logger = scop.ServiceProvider.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex , "an error has occured during a migration");
}

app.Run();
