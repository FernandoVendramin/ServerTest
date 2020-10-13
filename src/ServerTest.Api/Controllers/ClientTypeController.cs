using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ServerTest.Infra;
using ServerTest.Models;
using System.Collections.Generic;
using System.Linq;

namespace ServerTest.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientTypeController : ControllerBase
    {
        private readonly ILogger<ClientTypeController> _logger;
        private readonly Context _context;

        public ClientTypeController(ILogger<ClientTypeController> logger, Context context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<ClientType> Get()
        {
            return _context.ClientType
                .ToList();
        }
    }
}
