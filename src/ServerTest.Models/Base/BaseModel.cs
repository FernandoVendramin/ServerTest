using ServerTest.Utils;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServerTest.Models.Base
{
    public class BaseModel
    {
        public int Id { get; set; }

        [Required]
        public DateTime EditionDateTime { get; set; }

        [NotMapped]
        public StateChange StateChange { get; set; }
    }
}
