using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OA_Data;
using OA_Service.DTOs;
using OA_Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OA_WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly INewService _newService;
        private readonly IMapper _mapper;
        public NewsController(INewService newService, IMapper mapper)
        {
            _newService = newService;
            _mapper = mapper;
        }
        [HttpGet("GetAllNews")]
        public async Task<ActionResult> GetAllNews([FromQuery] PagingParams pagingParams, [FromQuery] SortingParams sortingParams, string searchBy)
        {
            var newsInDb = await _newService.GetAllNews(pagingParams, sortingParams, searchBy);


            return Ok(newsInDb);
        }
        [HttpGet("GetNewById")]
        public ActionResult GetNewById(int id)
        {
            var newInDb = _newService.GetNewById(id);

            if (newInDb == null) return NotFound();

            return Ok(_mapper.Map<New, NewDto>(newInDb));
        }
        [HttpPost("AddNew")]
        public void AddNew(NewDto newDto)
        {

            _newService.AddNew(newDto);

        }

    }
}
