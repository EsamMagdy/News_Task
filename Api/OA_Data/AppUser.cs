using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace OA_Data
{
    public class AppUser : IdentityUser
    {
        public ICollection<AppUserRole> UserRoles { get; set; }
        public bool IsDeleted { get; set; }
        
    }
}