using OA_Data;
using OA_Service.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OA_Service.Interface
{
    public interface INewService
    {
        Task<ResponseModel<PagingSortingFiltering<New>>> GetAllNews(PagingParams pagingParams, SortingParams sortingParams, string searchBy);
        NewDto GetNewById(int Id);
        void AddNew(NewDto newDto);
        void UpdateNew(int id, NewDto newDto);
        void DeleteNew(int id);
    }
}
