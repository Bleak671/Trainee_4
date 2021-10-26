using Newtonsoft.Json;
using P4.DAL;
using P4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace P4.BLL
{
    public class PhotoReviewBLL : IDisposable
    {
        PhotoReviewRepository db;
        public PhotoReviewBLL(AppDBContext context)
        {
            db = new PhotoReviewRepository(context);
        }

        public void CreatePhotoReview(string value)
        {
            PhotoReview res = JsonConvert.DeserializeObject<PhotoReview>(value);
            db.Create(res);
        }

        public IEnumerable<PhotoReview> GetUsersReviews(string id)
        {
            IEnumerable<PhotoReview> allComments = db.GetAll();
            IEnumerable<PhotoReview> res = from c in allComments
                                            where c.UserId.ToString() == id
                                            select c;
            return res;
        }
        public IEnumerable<PhotoReview> GetPhotosReviews(string id)
        {
            IEnumerable<PhotoReview> allComments = db.GetAll();
            IEnumerable<PhotoReview> res = from c in allComments
                                            where c.PhotoId.ToString() == id
                                            select c;
            return res;
        }

        public PhotoReview GetReview(string id)
        {
            return db.GetOne(Guid.Parse(id));
        }

        public void UpdateReview(string value)
        {
            PhotoReview res = JsonConvert.DeserializeObject<PhotoReview>(value);
            db.Update(res);
        }

        public void DeleteReview(string id)
        {
            db.Delete(Guid.Parse(id));
        }

        public void Dispose()
        {
            db.Dispose();
        }
    }
}
