using OA_Service.DTOs;
using OA_Data;
using AutoMapper;

namespace OA_Service.Helpers.Mapping
{
    public class AppUser_AppUserDtoProfile : Profile
    {
        public AppUser_AppUserDtoProfile()
        {
            CreateMap<AppUser, AppUserDto>()
                .ReverseMap()
                .ForMember(m => m.Id, opt => opt.Ignore())
                .ForMember(m => m.UserRoles, opt => opt.Ignore());



        }
    }
}