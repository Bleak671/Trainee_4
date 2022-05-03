using P4.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace P4.DAL
{
    public class TagRepository : IRepository<Tag>
    {
        private AppDBContext db;
        public TagRepository(AppDBContext context)
        {
            db = context;
        }

        public void Create(Tag tag)
        {
            int result = 1;
            try
            {
                if (tag.TagId.ToString() == Guid.Empty.ToString())
                    tag.TagId = Guid.NewGuid();
                db.Tags.Add(tag);
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

        public List<Tag> GetAll()
        {
            var tList = db.Tags.ToList();
            return tList;
        }

        public Tag GetOne(Guid id)
        {
            return db.Tags.FirstOrDefault(p => p.TagId == id);
        }

        public void Update(Guid id, Tag tag)
        {
            int result = 1;
            try
            {
                var old = db.Tags.FirstOrDefault(i => i.TagId == id);
                db.Entry(old).CurrentValues.SetValues(tag);
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
                Tag pht = db.Tags.FirstOrDefault(p => p.TagId == id);
                db.Tags.Remove(pht);
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
