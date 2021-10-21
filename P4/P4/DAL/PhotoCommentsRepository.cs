using P4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace P4.DAL
{
    public class PhotoCommentsRepository : IRepository<PhotoComment>, IDisposable
    {
        private AppDBContext db;
        public PhotoCommentsRepository(AppDBContext context)
        {
            db = context;
        }

        public void Create(PhotoComment photoCom)
        {
            db.PhotoComments.Add(photoCom);
            if (db.SaveChanges() != 1)
            {
                Console.WriteLine("CreateError");
            }
        }

        public List<PhotoComment> GetAll()
        {
            return db.PhotoComments.ToList<PhotoComment>();
        }

        public PhotoComment GetOne(Guid id)
        {
            return db.PhotoComments.FirstOrDefault(p => p.PhotoCommentId == id);
        }

        public void Update(PhotoComment photoCom)
        {
            db.PhotoComments.Update(photoCom);
            if (db.SaveChanges() != 1)
            {
                Console.WriteLine("UpdateError");
            }
        }

        public void Delete(Guid id)
        {
            PhotoComment result = db.PhotoComments.FirstOrDefault(p => p.PhotoCommentId == id);
            db.PhotoComments.Remove(result);
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
