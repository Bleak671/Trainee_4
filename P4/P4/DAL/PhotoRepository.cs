using P4.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace P4.DAL
{
    public class PhotoRepository : IRepository<Photo>
    {
        private AppDBContext db;
        public PhotoRepository(AppDBContext context)
        {
            db = context;
        }

        public void Create(Photo photo)
        {
            int result = 1;
            try
            {
                if (photo.UserId.ToString() == Guid.Empty.ToString())
                    photo.UserId = Guid.NewGuid();
                db.Photos.Add(photo);
                result = db.SaveChanges();
            }
            catch
            {

                throw;
            }
            if (result != 1)
            {
                throw new Exception("Can't Add");
            }
        }

        public List<Photo> GetAll()
        {
            var pList = db.Photos.ToList();
            foreach (Photo p in pList)
            {
                p.User = db.Users.Find(p.UserId);
            }
            return pList;
        }

        public Photo GetOne(Guid id)
        {
            return db.Photos.FirstOrDefault(p => p.PhotoId == id);
        }

        public void Update(Guid id, Photo photo)
        {
            int result = 1;
            try
            {
                var old = db.Photos.FirstOrDefault(i => i.PhotoId == id);
                db.Entry(old).CurrentValues.SetValues(photo);
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
                Photo pht = db.Photos.FirstOrDefault(p => p.PhotoId == id);
                db.Photos.Remove(pht);
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
