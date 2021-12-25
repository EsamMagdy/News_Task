using AutoMapper;
using OA_Data;
using OA_Service.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OA_Service.Mapping
{
    public class New_NewDtoProfile : Profile
    {
        public New_NewDtoProfile()
        {
            CreateMap<New, NewDto>()
                .ReverseMap()
                .ForMember(m => m.Id, opt => opt.Ignore());



        }
    }
}
