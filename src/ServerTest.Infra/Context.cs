using Microsoft.EntityFrameworkCore;
using ServerTest.Models;

namespace ServerTest.Infra
{
    public class Context : DbContext
    {
        public Context(
            DbContextOptions<Context> options)
            : base(options)
        {
            this.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public DbSet<Client> Client { get; set; }
        public DbSet<ClientAddress> ClientAddress { get; set; }
        public DbSet<ClientType> ClientType { get; set; }
        public DbSet<ClientPhone> ClientPhone { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            optionsBuilder.EnableSensitiveDataLogging();
        }
    }
}
