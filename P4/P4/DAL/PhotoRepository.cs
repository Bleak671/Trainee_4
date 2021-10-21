using P4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace P4.DAL
{
    public class PhotoRepository : IRepository<Photo>, IDisposable
    {
        private AppDBContext db;
        public PhotoRepository(AppDBContext context)
        {
            db = context;
        }

        public void Create(Photo photo)
        {
            db.Photos.Add(photo);
            if (db.SaveChanges() != 1)
            {
                Console.WriteLine("CreateError");
            }
        }

        public List<Photo> GetAll()
        {
            return db.Photos.ToList<Photo>();
        }

        public Photo GetOne(Guid id)
        {
            return db.Photos.FirstOrDefault(p => p.PhotoId == id);
        }

        public void Update(Photo photo)
        {
            db.Photos.Update(photo);
            if (db.SaveChanges() != 1)
            {
                Console.WriteLine("UpdateError");
            }
        }

        public void Delete(Guid id)
        {
            Photo result = db.Photos.FirstOrDefault(p => p.PhotoId == id);
            db.Photos.Remove(result);
            db.SaveChanges();
            if (db.SaveChanges() != 1)
            {
                Console.WriteLine("UpdateError");
            }
        }

        public void Dispose()
        {
            db.SaveChanges();
            db.Dispose();
        }
    }
}
