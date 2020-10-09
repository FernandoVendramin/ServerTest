using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ServerTest.Infra;
using ServerTest.Models;
using System.Collections.Generic;
using System.Linq;

namespace ServerTest.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientController : Controller
    {
        private readonly ILogger<ClientController> _logger;
        private readonly Context _context;

        public ClientController(ILogger<ClientController> logger, Context context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Client> Get()
        {
            return _context.Client
                .Include(x => x.ClientType)
                .Include(x => x.Addresses)
                .Include(x => x.Phones)
                .ToList();
        }

        [HttpGet("{id}")]
        public Client GetById(int id)
        {
            return _context.Client
                .Where(x => x.Id == id)
                .Include(x => x.ClientType)
                .Include(x => x.Addresses)
                .Include(x => x.Phones)
                .FirstOrDefault();
        }
    }
}
