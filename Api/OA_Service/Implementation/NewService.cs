using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using OA_Data;
using OA_Repo;
using OA_Service.DTOs;
using OA_Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OA_Service.Implementation
{
    class NewService : INewService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IImageConversion _imageConversion;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public NewService(IUnitOfWork unitOfWork,
            IMapper mapper,
            IImageConversion imageConversion,
            IWebHostEnvironment hostingEnvironment)
        {
            _unitOfWork = unitOfWork;
            _imageConversion = imageConversion;
            _mapper = mapper;
            _hostingEnvironment = hostingEnvironment;
        }
        public async Task<ResponseModel<PagingSortingFiltering<New>>> GetAllNews(PagingParams pagingParams, SortingParams sortingParams, string searchBy)
        {
            var news = _unitOfWork.News
                        .GetAll();

            var deserializedString = "";

            if (!string.IsNullOrEmpty(sortingParams.SortBy))
                deserializedString = JsonConvert.DeserializeObject<string>(sortingParams.SortBy);


            switch (deserializedString)
            {
                case "NameAr":
                    if (sortingParams.Order == 1)
                        news = news.OrderBy(s => s.NameAr);
                    else
                        news = news.OrderByDescending(s => s.NameAr);
                    break;
                case "NameEn":
                    if (sortingParams.Order == 1)
                        news = news.OrderBy(s => s.NameEn);
                    else
                        news = news.OrderByDescending(s => s.NameEn);
                    break;
                case "DetailsAr":
                    if (sortingParams.Order == 1)
                        news = news.OrderBy(s => s.DetailsAr);
                    else
                        news = news.OrderByDescending(s => s.DetailsAr);
                    break;
                case "DetailsEn":
                    if (sortingParams.Order == 1)
                        news = news.OrderBy(s => s.DetailsEn);
                    else
                        news = news.OrderByDescending(s => s.DetailsEn);
                    break;
                default:
                    news = news.OrderBy(s => s.NameAr);
                    break;
            }
            // if (!string.IsNullOrEmpty(deserializedString) && sortingParams.Order == 1)
            //     users = users.OrderBy(s => GetPropertyValue(s, deserializedString));

            // if (!string.IsNullOrEmpty(deserializedString) && sortingParams.Order == -1)
            //     users = users.OrderByDescending(s => GetPropertyValue(s, deserializedString));

            if (!string.IsNullOrEmpty(searchBy))
            {
                news = news.Where(s => s.NameAr.Contains(searchBy)
                                        || s.NameEn.Contains(searchBy)
                                        || s.DetailsAr.Contains(searchBy)
                                        || s.DetailsEn.Contains(searchBy));
            }
            var result = await PagingSortingFilteringList<New>
                            .CreateAsync(news, pagingParams);

            string contentRootPath = _hostingEnvironment.ContentRootPath + @"\Images";
            result.Items.ForEach(s =>
            {
                s.Image = s.Image != null
                            ? _imageConversion.GetImagePath(contentRootPath, s.Image)
                            : null;
            });
            return new ResponseModel<PagingSortingFiltering<New>> { Data = result };
        }
        public NewDto GetNewById(int Id)
        {
            var newsInDb = _unitOfWork.News.Get(Id);

            return _mapper.Map<New, NewDto>(newsInDb);
        }
        public void AddNew(NewDto newDto)
        {
            newDto.Image = _imageConversion
                                .SaveImageToPath(newDto.Image, newDto.ImageName);

            var news = _mapper.Map<NewDto, New>(newDto);
            _unitOfWork.News.Insert(news);


        }
        public void UpdateNew(int id, NewDto newDto)
        {
            var newInDb = GetNewById(id);

            if (newInDb == null) throw new ArgumentNullException("entity");

            var newData = _mapper.Map<NewDto, New>(newDto);

            _unitOfWork.News.Update(newData);

        }
        public void DeleteNew(int id)
        {

            var newsDto = GetNewById(id);

            if (newsDto == null) throw new ArgumentNullException("entity");

            var newsInDb = _mapper.Map<NewDto, New>(newsDto);

            newsInDb.IsDeleted = true;

        }
    }
}
