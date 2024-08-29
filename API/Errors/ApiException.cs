using System;

namespace API.Errors;

public class ApiException(int statusCOde,string message, string? details)
{
    public int StatusCOde { get; set; } = statusCOde;
    public string Message { get; set; } = message;
    public string? Details { get; set; } = details;
}
