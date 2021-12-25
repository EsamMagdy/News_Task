using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OA_Data;
using System;

namespace OA_Repo
{
    public class ApplicationContext : IdentityDbContext<AppUser, AppRole, string, IdentityUserClaim<string>,
     AppUserRole, IdentityUserLogin<string>,
     IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public ApplicationContext(DbContextOptions options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);


            builder.Entity<AppUser>()
                          .HasMany(ur => ur.UserRoles)
                          .WithOne(u => u.User)
                          .HasForeignKey(ur => ur.UserId)
                          .IsRequired();

            builder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();

        }

        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<New> News{ get; set; }

    }
}
