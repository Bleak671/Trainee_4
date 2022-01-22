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
        private IRepository<PhotoComment> _photoCommentRepos;
        public PhotoCommentBLL(IRepository<PhotoComment> photoCommentRepos)
        {
            _photoCommentRepos = photoCommentRepos;
        }

        public void CreatePhotoComment(PhotoComment photoCom)
        {
            _photoCommentRepos.Create(photoCom);
        }

        public List<PhotoComment> GetAllComments()
        {
            return _photoCommentRepos.GetAll();
        }

        public List<PhotoComment> GetUsersComments(Guid id)
        {
            return _photoCommentRepos.GetAll()
                .Where(p => p.UserId.ToString() == id.ToString())
                .ToList();
        }
        public List<PhotoComment> GetPhotosComments(Guid id)
        {
            return _photoCommentRepos.GetAll()
                .Where(p => p.PhotoId.ToString() == id.ToString())
                .ToList();
        }

        public PhotoComment GetComment(Guid id)
        {
            return _photoCommentRepos.GetOne(id);
        }

        public void UpdateComment(Guid id, PhotoComment photoComment)
        {
            _photoCommentRepos.Update(id, photoComment);
        }

        public void DeleteComment(Guid id)
        {
            _photoCommentRepos.Delete(id);
        }

        public void Dispose()
        {
            _photoCommentRepos.Dispose();
        }
    }
}
