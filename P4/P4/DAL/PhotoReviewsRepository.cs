using P4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace P4.DAL
{
    public class PhotoReviewsRepository : IRepository<PhotoReview>, IDisposable
    {
        private AppDBContext db;
        public PhotoReviewsRepository(AppDBContext context)
        {
            db = context;
        }

        public void Create(PhotoReview photoRev)
        {
            db.PhotoReviews.Add(photoRev);
            if (db.SaveChanges() != 1)
            {
                Console.WriteLine("CreateError");
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
            db.PhotoReviews.Update(photoRev);
            if (db.SaveChanges() != 1)
            {
                Console.WriteLine("UpdateError");
            }
        }

        public void Delete(Guid id)
        {
            PhotoReview result = db.PhotoReviews.FirstOrDefault(p => p.PhotoReviewId == id);
            db.PhotoReviews.Remove(result);
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
