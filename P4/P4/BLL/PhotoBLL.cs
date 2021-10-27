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
        private IRepository<Photo> _photoRepos;
        public PhotoBLL(IRepository<Photo> photoRepos)
        {
            _photoRepos = photoRepos;
        }

        public void CreatePhoto(Photo photo)
        {
            _photoRepos.Create(photo);
        }

        public List<Photo> GetAllPhotos()
        {
            return _photoRepos.GetAll();
        }

        public List<Photo> GetPublishedPhotos()
        {
            return _photoRepos.GetAll().Where(p=>p.isPublished == true).OrderBy(p=>p.UploadDate).ToList();
        }

        public List<Photo> GetPublishedNotTrashPhotos()
        {
            return _photoRepos.GetAll().Where(p => p.isPublished == true).Where(p => p.isTrash == false).OrderBy(p => p.UploadDate).ToList();
        }

        public List<Photo> GetTrashPhotos()
        {
            return _photoRepos.GetAll().Where(p => p.isTrash == true).OrderBy(p => p.UploadDate).ToList();
        }

        public List<Photo> GetNotTrashPhotos()
        {
            return _photoRepos.GetAll().Where(p => p.isTrash == false).OrderBy(p => p.UploadDate).ToList();
        }

        public List<Photo> GetUsersPhotos(Guid id)
        {
            return _photoRepos.GetAll().Where(p => p.UserId.ToString() == id.ToString()).OrderBy(p => p.UploadDate).ToList();
        }

        public Photo GetPhoto(Guid id)
        {
            return _photoRepos.GetOne(id);
        }

        public void UpdatePhoto(Photo photo)
        {
            _photoRepos.Update(photo);
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
