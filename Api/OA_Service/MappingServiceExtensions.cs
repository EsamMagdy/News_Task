using System;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using OA_Service.Helpers.Mapping;
using OA_Service.Mapping;

namespace API.Extensions
{
    public static class MappingServiceExtensions
    {
        public static IServiceCollection AddMappingServices(this IServiceCollection services, IConfiguration config)
        {
            var mappingConfig = new MapperConfiguration(mc =>
                               {
                                   mc.AddProfile(new AppUser_AppUserDtoProfile());
                                   mc.AddProfile(new New_NewDtoProfile());
                               });

            IMapper mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);
            return services;
        }
    }
}