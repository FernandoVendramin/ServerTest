using Refit;
using ServerTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.UI.WithDevexpress.ApiProxy
{
    public interface IClientTypeApiProxy
    {
        [Get("/api/ClientType")]
        Task<IEnumerable<ClientType>> Get();
    }
}
