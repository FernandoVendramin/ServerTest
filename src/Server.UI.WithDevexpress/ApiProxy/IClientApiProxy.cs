using Refit;
using ServerTest.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.UI.WithDevexpress.ApiProxy
{
    public interface IClientApiProxy
    {
        [Get("/api/Client")]
        Task<IEnumerable<Client>> Get();

        [Get("/api/Client/{id}")]
        Task<Client> GetById([AliasAs("id")] int id);
    }
}
