using OA_Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OA_Repo
{
    public class UnitOfWork : IUnitOfWork,IDisposable
    {
        private readonly ApplicationContext _context;
        public Repository<New> News { get; set; }
        public UnitOfWork(ApplicationContext context)
        {
            _context = context;
            News = new Repository<New>(context);
        }
        public void Complete()
        {
            _context.SaveChanges();
        }
        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
