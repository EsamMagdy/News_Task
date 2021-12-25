using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using OA_Data;

namespace OA_Service.DTOs
{
    public class AppUserDto
    {
        public string Id { get; set; }

        [Required]
        [EmailAddress]
        [DataType(DataType.Password)]
        public string Email { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
    }
}