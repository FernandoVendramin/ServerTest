using ServerTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.UI.WithDevexpress.Models
{
    public class HomeViewModel
    {
        public Client Client { get; set; }
     
        public List<ClientAddress> ClientAddresses { get; set; }
        
        public List<ClientPhone> ClientPhones { get; set; }
    }
}
