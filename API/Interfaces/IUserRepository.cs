using System;
using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface IUserRepository
{
    Task<IEnumerable<AppUser>> GetUsersAsync();
    Task<AppUser?> GetUserByIdAsync(int id);
    Task<AppUser?> GetUserByUsernameAsync(string username);
    void Update(AppUser appUser);
    Task<bool> SaveAllAsync();
    Task<IEnumerable<MemberDto>> GetMembersDtoAsync();
    Task<MemberDto?> GetMemberDtoAsync(string username);
}
