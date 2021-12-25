using System.Collections;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace OA_Data
{
    public class AppRole : IdentityRole
    {
        public ICollection<AppUserRole> UserRoles { get; set; }
        public bool IsDeleted { get; set; }

    }
}