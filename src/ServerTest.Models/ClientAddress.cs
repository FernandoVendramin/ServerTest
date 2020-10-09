using ServerTest.Models.Base;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServerTest.Models
{
    public class ClientAddress : BaseModel
    {
        [Required]
        [ForeignKey(nameof(ClientId))]
        public int ClientId { get; set; }
        public virtual Client Client { get; set; }

        public string Address { get; set; }
        public int Number { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string District { get; set; }
        public string PostalCode { get; set; }
    }
}
