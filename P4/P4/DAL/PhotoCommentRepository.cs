using P4.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace P4.DAL
{
    public class PhotoCommentRepository : IRepository<PhotoComment>
    {
        private AppDBContext db;
        public PhotoCommentRepository(AppDBContext context)
        {
            db = context;
        }

        public void Create(PhotoComment photoCom)
        {
            int result = 1;
            try
            {
                if (photoCom.UserId.ToString() == Guid.Empty.ToString())
                    photoCom.UserId = Guid.NewGuid();
                db.PhotoComments.Add(photoCom);
                result = db.SaveChanges();
            }
            catch
            {
                throw new Exception("DB Error");
            }
            if (result != 1)
            {
                throw new Exception("Can't Add");
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
            int result = 1;
            try
            {
                db.PhotoComments.Update(photoCom);
                result = db.SaveChanges();
            }
            catch
            {
                throw new Exception("DB Error");
            }
            if (result != 1)
            {
                throw new Exception("Can't Update");
            }
        }

        public void Delete(Guid id)
        {
            int result = 1;
            try
            {
                PhotoComment pht = db.PhotoComments.FirstOrDefault(p => p.PhotoCommentId == id);
                db.PhotoComments.Remove(pht);
                result = db.SaveChanges();
            }
            catch
            {
                throw new Exception("DB Error");
            }
            if (result != 1)
            {
                throw new Exception("Can't Delete");
            }
        }

        public void Dispose()
        {
            db.Dispose();
        }
    }
}
