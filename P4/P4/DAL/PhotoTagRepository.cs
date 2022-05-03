using P4.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace P4.DAL
{
    public class PhotoTagRepository : IRepository<Photo_m2m_Tag>
    {
        private AppDBContext db;
        public PhotoTagRepository(AppDBContext context)
        {
            db = context;
        }

        public void Create(Photo_m2m_Tag photoTag)
        {
            int result = 1;
            try
            {
                if (photoTag.Id.ToString() == Guid.Empty.ToString())
                    photoTag.Id = Guid.NewGuid();
                db.PhotoTags.Add(photoTag);
                result = db.SaveChanges();
            }
            catch
            {

                throw;
            }
            if (result != 1)
            {
                throw new Exception("Can't Add");
            }
        }

        public List<Photo_m2m_Tag> GetAll()
        {
            var pList = db.PhotoTags.ToList();
            foreach (Photo_m2m_Tag p in pList)
            {
                p.Photo = db.Photos.Find(p.PhotoId);
                p.Tag = db.Tags.Find(p.TagId);
            }
            return pList;
        }

        public Photo_m2m_Tag GetOne(Guid id)
        {
            return db.PhotoTags.FirstOrDefault(p => p.Id == id);
        }

        public void Update(Guid id, Photo_m2m_Tag photoTag)
        {
            int result = 1;
            try
            {
                var old = db.PhotoTags.FirstOrDefault(i => i.Id == id);
                db.Entry(old).CurrentValues.SetValues(photoTag);
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
                Photo_m2m_Tag pht = db.PhotoTags.FirstOrDefault(p => p.Id == id);
                db.PhotoTags.Remove(pht);
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
