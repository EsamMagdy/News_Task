using System.Threading.Tasks;
using OA_Data;

namespace OA_Service.Interface
{ 
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);
    }
}