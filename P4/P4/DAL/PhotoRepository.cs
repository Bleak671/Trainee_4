using Microsoft.EntityFrameworkCore;
using P4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace P4.DAL
{
    public class PhotoRepository : IRepository<Photo>
    {
        private AppDBContext db;
        public PhotoRepository(AppDBContext context)
        {
            db = context;
        }

        public Guid Create(Photo photo)
        {
            int result = 1;
            try
            {
                if (photo.UserId.ToString() == Guid.Empty.ToString())
                    photo.UserId = Guid.NewGuid();
                var e = db.Photos.Add(photo);
                result = db.SaveChanges();
                return e.Entity.PhotoId;
            }
            catch
            {

                throw;
            }
            if (result != 1)
            {
                throw new Exception("Can't Add");
            }
            return Guid.Empty;
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
            var res = db.Photos.FirstOrDefault(p => p.PhotoId == id);
            res.User = db.Users.FirstOrDefault(u => u.UserId == res.UserId);
            return res;
        }

        public void Update(Guid id, Photo photo)
        {
            int result = 1;
            try
            {
                var old = db .Photos.FirstOrDefault(i => i.PhotoId == id);
                db.Entry(old).CurrentValues.SetValues(photo);
                result = db.SaveChanges();
            }
            catch (Exception e)
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
                var tags = db.PhotoTags.Where(pt => pt.PhotoId == pht.PhotoId);
                var comments = db.PhotoComments.Where(pt => pt.PhotoId == pht.PhotoId);
                var reviews = db.PhotoReviews.Where(pt => pt.PhotoId == pht.PhotoId);
                db.PhotoTags.RemoveRange(tags);
                db.PhotoComments.RemoveRange(comments);
                db.PhotoReviews.RemoveRange(reviews);
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
