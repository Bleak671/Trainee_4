using Microsoft.EntityFrameworkCore;
using P4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace P4.DAL
{
    public class UserMessageRepository : IRepository<UserMessage>
    {
        private AppDBContext db;
        public UserMessageRepository(AppDBContext context)
        {
            db = context;
        }

        public Guid Create(UserMessage userMessage)
        {
            int result = 1;
            try
            {
                if (userMessage.UserMessageId.ToString() == Guid.Empty.ToString())
                    userMessage.UserMessageId = Guid.NewGuid();
                userMessage.UploadDate = DateTime.Now;
                var e = db .UserMessages.Add(userMessage);
                result = db.SaveChanges();
                return e.Entity.UserMessageId;
            }
            catch
            {
                throw new Exception("DB Error");
            }
            if (result != 1)
            {
                throw new Exception("Can't Add");
            }
            return Guid.Empty;
        }

        public List<UserMessage> GetAll()
        {
            return db.UserMessages.ToList<UserMessage>();
        }

        public UserMessage GetOne(Guid id)
        {
            return db.UserMessages.FirstOrDefault(p => p.UserMessageId == id);
        }

        public void Update(Guid id, UserMessage photoCom)
        {
            int result = 1;
            try
            {
                var old = db.UserMessages.FirstOrDefault(i => i.UserMessageId == id);
                db.Entry(old).CurrentValues.SetValues(photoCom);
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
                UserMessage pht = db.UserMessages.FirstOrDefault(p => p.UserMessageId == id);
                db.UserMessages.Remove(pht);
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
