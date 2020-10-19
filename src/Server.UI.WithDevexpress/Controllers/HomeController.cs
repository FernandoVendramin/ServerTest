using System.Threading.Tasks;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using Server.UI.WithDevexpress.ApiProxy;
using ServerTest.Models;
using ServerTest.Utils;

namespace Server_UI_WithDevexpress.Controllers
{
    public class HomeController : Controller
    {
        private readonly IClientTypeApiProxy clientTypeApiProxy;

        public HomeController(IClientTypeApiProxy clientTypeApiProxy)
        {
            this.clientTypeApiProxy = clientTypeApiProxy;
        }

        public IActionResult Index()
        {
            return View(new Client());
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error() {
            return View();
        }

        [HttpGet]
        public async Task<LoadResult> GetClientTypeAsync(DataSourceLoadOptions loadOptions) {
            return DataSourceLoader.Load(await clientTypeApiProxy.Get(), loadOptions);
        }

        [HttpPost]
        public IActionResult Index(Client client)
        {
            client.StateChange = StateChange.Unchanged;

            if (client.Addresses != null)
            {
                foreach (var clientAddress in client.Addresses)
                {
                    clientAddress.StateChange = StateChange.Unchanged;
                }
            }

            if (client.Phones != null)
            {
                foreach (var clientPhone in client.Phones)
                {
                    clientPhone.StateChange = StateChange.Unchanged;
                }
            }

            return View(client);
        }
    }
}
