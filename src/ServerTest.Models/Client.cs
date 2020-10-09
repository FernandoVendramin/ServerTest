using ServerTest.Models.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServerTest.Models
{
    public class Client : BaseModel
    {
        [Required]
        [MaxLength(255)]
        public string SocialReason { get; set; }

        [Required]
        [MaxLength(255)]
        public string FantasyName { get; set; }

        [Required]
        [MaxLength(255)]
        public string CPF { get; set; }

        [Required]
        [MaxLength(255)]
        public string RG { get; set; }

        [Required]
        public DateTime BirthDataTime { get; set; }        

        [Required]
        [ForeignKey(nameof(ClientTypeId))]
        public int ClientTypeId { get; set; }
        public virtual ClientType ClientType { get; set; }

        public IEnumerable<ClientAddress> Addresses { get; set; }
        public IEnumerable<ClientPhone> Phones { get; set; }
    }
}
