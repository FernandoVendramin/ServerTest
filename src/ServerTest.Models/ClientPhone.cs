using ServerTest.Models.Base;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServerTest.Models
{
    public class ClientPhone : BaseModel
    {
        [Required]
        [ForeignKey(nameof(ClientId))]
        public int ClientId { get; set; }
        public virtual Client Client { get; set; }

        public string PhoneNumber { get; set; }
    }
}
