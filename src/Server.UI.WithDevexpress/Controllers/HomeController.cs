using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using Server.UI.WithDevexpress.ApiProxy;
using Server.UI.WithDevexpress.Models;
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
            return View(new HomeViewModel());
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error() {
            return View();
        }

        [HttpGet]
        public async Task<LoadResult> GetClientTypeAsync(DataSourceLoadOptions loadOptions) {
            return DataSourceLoader.Load(await clientTypeApiProxy.Get(), loadOptions);
        }
    }
}
