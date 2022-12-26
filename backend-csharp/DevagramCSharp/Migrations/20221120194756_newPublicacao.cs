using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DevagramCSharp.Migrations
{
    /// <inheritdoc />
    public partial class newPublicacao : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Descricao",
                table: "Publicacoes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Descricao",
                table: "Publicacoes");
        }
    }
}
