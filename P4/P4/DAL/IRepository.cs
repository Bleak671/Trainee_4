﻿using System;
using System.Collections.Generic;

namespace P4.DAL
{
    interface IRepository<T> where T : class
    {
        List<T> GetAll();
        T GetOne(Guid id);
        void Create(T item); 
        void Update(T item);
        void Delete(Guid id); 
    }
}
