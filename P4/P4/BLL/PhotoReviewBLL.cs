﻿using Newtonsoft.Json;
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
        private PhotoReviewRepository _photoReviewRepos;
        public PhotoReviewBLL(PhotoReviewRepository photoReviewRepos)
        {
            _photoReviewRepos = photoReviewRepos;
        }

        public void CreatePhotoReview(PhotoReview photoReview)
        {
            _photoReviewRepos.Create(photoReview);
        }

        public List<PhotoReview> GetUsersReviews(Guid id)
        {
            return _photoReviewRepos.GetAll().Where(p => p.UserId.ToString() == id.ToString()).ToList();
        }
        public List<PhotoReview> GetPhotosReviews(Guid id)
        {
            return _photoReviewRepos.GetAll().Where(p => p.PhotoId.ToString() == id.ToString()).ToList();
        }

        public PhotoReview GetReview(Guid id)
        {
            return _photoReviewRepos.GetOne(id);
        }

        public void UpdateReview(PhotoReview photoReview)
        {
            _photoReviewRepos.Update(photoReview);
        }

        public void DeleteReview(Guid id)
        {
            _photoReviewRepos.Delete(id);
        }

        public void Dispose()
        {
            _photoReviewRepos.Dispose();
        }
    }
}
