using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using P4.BLL;
using P4.Models;
using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace P4.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TrashController : ControllerBase
    {
        private PhotoBLL _photoBll;
        private PhotoTagBLL _photoTagBLL;
        private TagBLL _tagBLL;
        public TrashController(UserBLL userDB, PhotoBLL photoDB, PhotoCommentBLL photoCommentDB, PhotoReviewBLL photoReviewDB, PhotoTagBLL photoTagBLL, TagBLL tagBLL)
        {
            _photoBll = photoDB;
            _photoTagBLL = photoTagBLL;
            _tagBLL = tagBLL;
        }
        // GET: TrashController
        [HttpGet("{id}")]
        public ActionResult<List<Photo>> Get(string id)
        {
            try
            {
                return new ObjectResult(_photoBll.GetUsersTrashPhotos(Guid.Parse(id)));
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public ActionResult Post([FromBody] PhotoExt val)
        {
            try
            {
                var photo = new Photo {
                    Link = val.Link,
                    Name = val.Name,
                    UserId = val.UserId,
                    Hash = val.Hash
                };
                var list = val.Tags;
                var pId = _photoBll.CreatePhoto(photo);
                if (!pId.Equals(Guid.Empty))
                {
                    var tagList = _tagBLL.GetTags();
                    foreach (var item in list)
                    {
                        var i = JsonConvert.DeserializeObject<TagExchangeStandart>(item.ToString());

                        if (i.Value)
                        {
                            var tag = tagList.Find(t => t.Name == i.Name);
                            Photo_m2m_Tag pt = new Photo_m2m_Tag
                            {
                                PhotoId = pId,
                                TagId = tag.TagId
                            };
                            _photoTagBLL.CreatePhotoTag(pt);
                        }
                    }
                }

                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        // PUT: TrashController/Edit/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] Photo photo)
        {
            try
            {
                _photoBll.UpdatePhoto(Guid.Parse(id), photo);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        // DELETE: TrashController/Delete/5
        [HttpDelete("Delete/{id}")]
        public ActionResult Delete(string id)
        {
            try
            {
                _photoBll.DeletePhoto(Guid.Parse(id));
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
