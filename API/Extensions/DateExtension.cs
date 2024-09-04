using System;

namespace API.Extensions;

public static class DateExtension
{
    public static int CalculateAge(this DateOnly dob){
        var today = DateOnly.FromDateTime(DateTime.Now);
        var age = today.Year - dob.Year;
        if(dob.AddYears(age) > today) age--;
        return age;
    }
}
