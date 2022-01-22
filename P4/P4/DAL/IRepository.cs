using System;
using System.Collections.Generic;

namespace P4.DAL
{
    public interface IRepository<T> : IDisposable where T : class
    {
        List<T> GetAll();
        T GetOne(Guid id);
        void Create(T item); 
        void Update(Guid id, T item);
        void Delete(Guid id); 
    }
}
