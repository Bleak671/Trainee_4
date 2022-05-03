using P4.DAL;
using P4.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace P4.BLL
{
    public class TagBLL : IDisposable
    {
        private IRepository<Tag> _TagRepos;

        public TagBLL(IRepository<Tag> TagRepos)
        {
            _TagRepos = TagRepos;
        }

        public void CreateTag(Tag Tag)
        {
            List<Tag> list = _TagRepos.GetAll();
            if (list.Any(x => x.Name == Tag.Name))
                throw new Exception("Tag exists");
            _TagRepos.Create(Tag);
        }

        public List<Tag> GetTags()
        {
            return _TagRepos.GetAll();
        }

        public Tag GetTag(Guid id)
        {
            return _TagRepos.GetOne(id);
        }

        public void UpdateTag(Guid id, Tag Tag)
        {
            List<Tag> list = _TagRepos.GetAll();
            if (list.Any(x => x.Name == Tag.Name && x.TagId != id))
                throw new Exception("Tag exists");
            _TagRepos.Update(id, Tag);
        }

        public void DeleteTag(Guid id)
        {
            _TagRepos.Delete(id);
        }

        public void Dispose()
        {
            _TagRepos.Dispose();
        }
    }
}
