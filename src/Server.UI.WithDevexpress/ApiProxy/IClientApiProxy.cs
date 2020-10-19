using Refit;
using ServerTest.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Server.UI.WithDevexpress.ApiProxy
{
    public interface IClientApiProxy
    {
        [Get("/api/Client")]
        Task<IEnumerable<Client>> Get([Query]int take);

        [Get("/api/Client/{id}")]
        Task<Client> GetById([AliasAs("id")] int id);
    }
}
