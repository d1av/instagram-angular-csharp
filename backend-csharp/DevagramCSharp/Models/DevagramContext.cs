using Microsoft.EntityFrameworkCore;

namespace DevagramCSharp.Models
{
    public class DevagramContext : DbContext
    {
        public DevagramContext(DbContextOptions<DevagramContext> options) : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Seguidor> Seguidores { get; set; }
        public DbSet<Publicacao> Publicacoes { get; set; }
        public DbSet<Comentario> Comentarios { get; set; }
        public DbSet<Curtida> Curtidas { get; set; }
    }
}
