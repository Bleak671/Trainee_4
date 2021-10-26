using P4.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace P4.DAL
{
    public class PhotoReviewRepository : IRepository<PhotoReview>, IDisposable
    {
        private AppDBContext db;
        public PhotoReviewRepository(AppDBContext context)
        {
            db = context;
        }

        public void Create(PhotoReview photoRev)
        {
            int result = 1;
            try
            {
                db.PhotoReviews.Add(photoRev);
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

        public List<PhotoReview> GetAll()
        {
            return db.PhotoReviews.ToList<PhotoReview>();
        }

        public PhotoReview GetOne(Guid id)
        {
            return db.PhotoReviews.FirstOrDefault(p => p.PhotoReviewId == id);
        }

        public void Update(PhotoReview photoRev)
        {
            int result = 1;
            try
            {
                db.PhotoReviews.Update(photoRev);
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
                PhotoReview pht = db.PhotoReviews.FirstOrDefault(p => p.PhotoReviewId == id);
                db.PhotoReviews.Remove(pht);
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
