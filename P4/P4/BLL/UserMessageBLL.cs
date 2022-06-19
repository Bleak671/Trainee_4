using P4.DAL;
using P4.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace P4.BLL
{
    public class UserMessageBLL : IDisposable
    {
        private IRepository<UserMessage> _UserMessageRepos;

        public UserMessageBLL(IRepository<UserMessage> UserMessageRepos)
        {
            _UserMessageRepos = UserMessageRepos;
        }

        public void CreateUserMessage(UserMessage UserMessage)
        {
            List<UserMessage> list = _UserMessageRepos.GetAll();
            _UserMessageRepos.Create(UserMessage);
        }

        public List<UserMessage> GetUserMessages(Guid id1, Guid id2)
        {
            return _UserMessageRepos.GetAll()
                .Where(um => (um.FromUserId.ToString() == id1.ToString() &&
                                                    um.ToUserId.ToString() == id2.ToString()) ||
                                                    (um.ToUserId.ToString() == id1.ToString() &&
                                                    um.FromUserId.ToString() == id2.ToString())).OrderBy(um => um.UploadDate).ToList();
        }

        public UserMessage GetUserMessage(Guid id)
        {
            return _UserMessageRepos.GetOne(id);
        }

        public void UpdateUserMessage(Guid id, UserMessage UserMessage)
        {
            List<UserMessage> list = _UserMessageRepos.GetAll();
            _UserMessageRepos.Update(id, UserMessage);
        }

        public void DeleteUserMessage(Guid id)
        {
            _UserMessageRepos.Delete(id);
        }

        public void Dispose()
        {
            _UserMessageRepos.Dispose();
        }
    }
}
