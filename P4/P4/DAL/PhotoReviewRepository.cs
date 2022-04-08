using P4.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace P4.DAL
{
    public class PhotoReviewRepository : IRepository<PhotoReview>
    {
        private AppDBContext db;
        public PhotoReviewRepository(AppDBContext context)
        {
            db = context;
        }

        public void Create(PhotoReview photoRev)
        {
            if (db.PhotoReviews.Any(pr => pr.UserId == photoRev.UserId &&
                                          pr.PhotoId == photoRev.PhotoId))
            {
                if (db.PhotoReviews.Any(pr => pr.UserId == photoRev.UserId &&
                                              pr.PhotoId == photoRev.PhotoId &&
                                              pr.isPositive == photoRev.isPositive))
                    return;
                else
                    Delete(db.PhotoReviews.First(pr => pr.UserId == photoRev.UserId &&
                                          pr.PhotoId == photoRev.PhotoId).PhotoReviewId);
            }

            int result = 1;
            try
            {
                if (photoRev.PhotoReviewId.ToString() == Guid.Empty.ToString())
                    photoRev.PhotoReviewId = Guid.NewGuid();
                db.PhotoReviews.Add(photoRev);
                result = db.SaveChanges();
            }
            catch(Exception e)
            {
                throw new Exception("DB Error " + e.Message);
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

        public void Update(Guid id, PhotoReview photoRev)
        {
            int result = 1;
            try
            {
                var old = db.PhotoReviews.FirstOrDefault(i => i.PhotoReviewId == id);
                db.Entry(old).CurrentValues.SetValues(photoRev);
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
