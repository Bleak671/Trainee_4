using Newtonsoft.Json;
using P4.DAL;
using P4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace P4.BLL
{
    public class PhotoCommentBLL : IDisposable
    {
        PhotoCommentRepository db;
        public PhotoCommentBLL(AppDBContext context)
        {
            db = new PhotoCommentRepository(context);
        }

        public void CreatePhotoComment(string value)
        {
            PhotoComment res = JsonConvert.DeserializeObject<PhotoComment>(value);
            db.Create(res);
        }

        public IEnumerable<PhotoComment> GetAllComments()
        {
            return db.GetAll();
        }

        public IEnumerable<PhotoComment> GetUsersComments(string id)
        {
            IEnumerable<PhotoComment> allComments = db.GetAll();
            IEnumerable<PhotoComment> res = from c in allComments
                                     where c.UserId.ToString() == id
                                     select c;
            return res;
        }
        public IEnumerable<PhotoComment> GetPhotosComments(string id)
        {
            IEnumerable<PhotoComment> allComments = db.GetAll();
            IEnumerable<PhotoComment> res = from c in allComments
                                            where c.PhotoId.ToString() == id
                                            select c;
            return res;
        }

        public PhotoComment GetComment(string id)
        {
            return db.GetOne(Guid.Parse(id));
        }

        public void UpdateComment(string value)
        {
            PhotoComment res = JsonConvert.DeserializeObject<PhotoComment>(value);
            db.Update(res);
        }

        public void DeleteComment(string id)
        {
            db.Delete(Guid.Parse(id));
        }

        public void Dispose()
        {
            db.Dispose();
        }
    }
}
