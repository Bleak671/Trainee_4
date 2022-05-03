using P4.DAL;
using P4.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace P4.BLL
{
    public class PhotoTagBLL : IDisposable
    {
        private IRepository<Photo_m2m_Tag> _PhotoTagRepos;

        public PhotoTagBLL(IRepository<Photo_m2m_Tag> PhotoTagRepos)
        {
            _PhotoTagRepos = PhotoTagRepos;
        }

        public void CreatePhotoTag(Photo_m2m_Tag PhotoTag)
        {
            List<Photo_m2m_Tag> list = _PhotoTagRepos.GetAll();
            _PhotoTagRepos.Create(PhotoTag);
        }

        public List<Photo_m2m_Tag> GetPhotoTags()
        {
            return _PhotoTagRepos.GetAll();
        }

        public Photo_m2m_Tag GetPhotoTag(Guid id)
        {
            return _PhotoTagRepos.GetOne(id);
        }

        public void UpdatePhotoTag(Guid id, Photo_m2m_Tag PhotoTag)
        {
            List<Photo_m2m_Tag> list = _PhotoTagRepos.GetAll();
            _PhotoTagRepos.Update(id, PhotoTag);
        }

        public void DeletePhotoTag(Guid id)
        {
            _PhotoTagRepos.Delete(id);
        }

        public void Dispose()
        {
            _PhotoTagRepos.Dispose();
        }
    }
}
