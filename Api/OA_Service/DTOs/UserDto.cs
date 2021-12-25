using System.Collections.Generic;

namespace OA_Service.DTOs
{
    public class UserDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Token { get;  set; }
        public bool IsActive { get;  set; }
        public List<UserRolesDto> Roles { get; set; }
    }
}