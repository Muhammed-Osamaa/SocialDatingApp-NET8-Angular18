using System;
using CloudinaryDotNet.Actions;

namespace API.Interfaces;

public interface IPhotoService
{
    Task<ImageUploadResult> AddPhotoAsync(IFormFile form);
    Task<DeletionResult> DeletePhotoAsync(string publicId);
}
