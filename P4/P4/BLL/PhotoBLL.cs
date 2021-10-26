using Newtonsoft.Json;
using P4.DAL;
using P4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace P4.BLL
{
    public class PhotoBLL : IDisposable
    {
        PhotoRepository db;
        public PhotoBLL(AppDBContext context)
        {
            db = new PhotoRepository(context);
        }

        public void CreatePhoto(string value)
        {
            Photo res = JsonConvert.DeserializeObject<Photo>(value);
            db.Create(res);
        }

        public IEnumerable<Photo> GetAllPhotos()
        {
            return db.GetAll();
        }

        public IEnumerable<Photo> GetPublishedPhotos()
        {
            IEnumerable<Photo> allPhotos = db.GetAll();
            IEnumerable<Photo> res = from p in allPhotos
                              where p.isPublished == true
                              orderby p.UploadDate
                              select p;
            return res;
        }

        public IEnumerable<Photo> GetPublishedNotTrashPhotos()
        {
            IEnumerable<Photo> allPhotos = db.GetAll();
            IEnumerable<Photo> res = from p in allPhotos
                                     where p.isPublished == true
                                     where p.isTrash == false
                                     orderby p.UploadDate
                                     select p;
            return res;
        }

        public IEnumerable<Photo> GetTrashPhotos()
        {
            IEnumerable<Photo> allPhotos = db.GetAll();
            IEnumerable<Photo> res = from p in allPhotos
                                     where p.isTrash == true
                                     select p;
            return res;
        }

        public IEnumerable<Photo> GetNotTrashPhotos()
        {
            IEnumerable<Photo> allPhotos = db.GetAll();
            IEnumerable<Photo> res = from p in allPhotos
                                     where p.isTrash == false
                                     select p;
            return res;
        }

        public IEnumerable<Photo> GetUsersPhotos(string id)
        {
            IEnumerable<Photo> allPhotos = db.GetAll();
            IEnumerable<Photo> res = from p in allPhotos
                                     where p.UserId.ToString() == id
                                     select p;
            return res;
        }

        public Photo GetPhoto(string id)
        {
            return db.GetOne(Guid.Parse(id));
        }

        public void UpdatePhoto(string value)
        {
            Photo res = JsonConvert.DeserializeObject<Photo>(value);
            db.Update(res);
        }

        public void DeletePhoto(string id)
        {
            db.Delete(Guid.Parse(id));
        }

        public void Dispose()
        {
            db.Dispose();
        }
    }
}
