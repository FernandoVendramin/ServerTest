using System.Threading.Tasks;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using Server.UI.WithDevexpress.ApiProxy;
using ServerTest.Models;

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
        public IActionResult Index(Client client) {
            return View(client);
        }
    }
}
