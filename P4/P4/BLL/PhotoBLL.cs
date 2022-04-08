using P4.DAL;
using P4.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace P4.BLL
{
    public class PhotoBLL : IDisposable
    {
        private IRepository<Photo> _photoRepos;
        public PhotoBLL(IRepository<Photo> photoRepos)
        {
            _photoRepos = photoRepos;
        }

        public void CreatePhoto(Photo photo)
        {
            List<Photo> list = _photoRepos.GetAll();
            if (list.Any(x => x.Hash == photo.Hash))
                throw new Exception("Hash exists");
            _photoRepos.Create(photo);
        }

        public List<Photo> GetAllPhotos()
        {
            
            return _photoRepos.GetAll();
        }

        public List<Photo> GetPublishedPhotos()
        {
            return _photoRepos.GetAll()
                .Where(p=>p.isPublished == true)
                .OrderBy(p=>p.UploadDate)
                .ToList();
        }

        public List<Photo> GetPublishedNotTrashPhotos()
        {
            return _photoRepos.GetAll()
                .Where(p => p.isPublished == true)
                .Where(p => p.isTrash == false)
                .Where(p => p.User.isBanned == false)
                .OrderBy(p => p.UploadDate)
                .ToList();
        }

        public List<Photo> GetTrashPhotos()
        {
            return _photoRepos.GetAll()
                .Where(p => p.isTrash == true)
                .OrderBy(p => p.UploadDate).ToList();
        }

        public List<Photo> GetNotTrashPhotos()
        {
            return _photoRepos.GetAll()
                .Where(p => p.isTrash == false)
                .OrderBy(p => p.UploadDate)
                .ToList();
        }

        public List<Photo> GetUsersPhotos(Guid id)
        {
            return _photoRepos.GetAll()
                .Where(p => p.UserId.ToString() == id.ToString())
                .OrderBy(p => p.UploadDate).ToList();
        }

        public List<Photo> GetUsersTrashPhotos(Guid id)
        {
            return _photoRepos.GetAll()
                .Where(p => p.UserId.ToString() == id.ToString())
                .Where(p => p.isTrash == true)
                .OrderBy(p => p.UploadDate)
                .ToList();
        }

        public Photo GetPhoto(Guid id)
        {
            return _photoRepos.GetOne(id);
        }

        public void UpdatePhoto(Guid id, Photo photo)
        {
            _photoRepos.Update(id, photo);
        }

        public void DeletePhoto(Guid id)
        {
            _photoRepos.Delete(id);
        }

        public void Dispose()
        {
            _photoRepos.Dispose();
        }
    }
}
