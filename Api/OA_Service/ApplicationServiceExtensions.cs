using System;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OA_Repo;
using OA_Service.Implementation;
using OA_Service.Interface;

namespace OA_Service
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<ITokenService, TokenService>();
            // for SqlServer
            services.AddDbContext<ApplicationContext>(options =>
                        {
                            options.UseSqlServer(config["ConnectionStrings:DefaultConnection"]);
                        });

            services.AddScoped(typeof(IUnitOfWork), typeof(UnitOfWork));
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddTransient<INewService, NewService>();
            services.AddSingleton<IImageConversion, ImageConversion>();
            return services;
            
        }
    }
}