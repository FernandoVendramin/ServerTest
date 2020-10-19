using Refit;
using ServerTest.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.UI.WithDevexpress.ApiProxy
{
    public interface IClientTypeApiProxy
    {
        [Get("/api/ClientType")]
        Task<IEnumerable<ClientType>> Get();
    }
}
