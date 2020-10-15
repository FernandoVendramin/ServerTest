using Bogus;
using Bogus.Extensions.Brazil;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ServerTest.Infra;
using ServerTest.Models;
using System;
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
        public IEnumerable<Client> Get([FromQuery] int take = 10)
        {
            return _context.Client
                .Include(x => x.ClientType)
                .Include(x => x.Addresses)
                .Include(x => x.Phones)
                .Take(take)
                .ToList();
        }

        [HttpPost]
        public Client Post([FromBody] Client client)
        {
            var newClient = client;

            return newClient;
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


        [HttpGet]
        [Route("GenerateData")]
        public string GenerateData()
        {
            if (_context.Client.Count() < 50000)
            {
                int j = 0;
                for (int i = 0; i < 50000; i++)
                {
                    var address = new Faker<ClientAddress>()
                        .RuleFor(x => x.EditionDateTime, DateTime.Now)
                        .RuleFor(x => x.Address, p => p.Address.FullAddress())
                        .RuleFor(x => x.City, p => p.Address.City())
                        .RuleFor(x => x.State, p => p.Address.State())
                        .RuleFor(x => x.Number, p => p.Random.Int(1, 9999))
                        .RuleFor(x => x.PostalCode, p => p.Address.ZipCode())
                        .RuleFor(x => x.Country, p => p.Address.Country())
                        .RuleFor(x => x.District, p => p.Address.SecondaryAddress())
                        .Generate();

                    var phone1 = new Faker<ClientPhone>()
                        .RuleFor(x => x.EditionDateTime, DateTime.Now)
                        .RuleFor(x => x.PhoneNumber, p => p.Phone.PhoneNumber())
                        .Generate();

                    var phone2 = new Faker<ClientPhone>()
                        .RuleFor(x => x.EditionDateTime, DateTime.Now)
                        .RuleFor(x => x.PhoneNumber, p => p.Phone.PhoneNumber())
                        .Generate();

                    var client = new Faker<Client>()
                        .RuleFor(x => x.EditionDateTime, DateTime.Now)
                        .RuleFor(p => p.SocialReason, p => p.Company.CompanyName())
                        .RuleFor(p => p.FantasyName, p => p.Company.CompanySuffix())
                        .RuleFor(p => p.CPF, p => p.Person.Cpf())
                        .RuleFor(p => p.RG, p => p.Person.Cpf())
                        .RuleFor(p => p.BirthDataTime, DateTime.Now)
                        .RuleFor(p => p.ClientTypeId, p => p.Random.Int(1, 4))
                        .RuleFor(p => p.Addresses, new List<ClientAddress>() { address })
                        .RuleFor(p => p.Phones, new List<ClientPhone>() { phone1, phone2 })
                        .Generate();

                    _context.Add(client);

                    j++;
                    if (j >= 1000)
                    {
                        _context.SaveChanges();
                        j = 0;
                    }
                }

                _context.SaveChanges();
            }

            return "Finish";
        }
    }
}
