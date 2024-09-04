using System;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfile : Profile //config for automapper
{
    public AutoMapperProfile()
    {
        CreateMap<AppUser, MemberDto>()
        .ForMember(d => d.Age , op => op.MapFrom(s => s.DateOfBirth.CalculateAge()))
        .ForMember(d => d.PhotoUrl, op => op.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain)!.Url));//use it when populated different prop 
        CreateMap<Photo, PhotoDto>();
    }
}
