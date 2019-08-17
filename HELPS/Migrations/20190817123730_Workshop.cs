using Microsoft.EntityFrameworkCore.Migrations;

namespace HELPS.Migrations
{
    public partial class Workshop : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SkillSet",
                table: "Workshops",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RoomId",
                table: "Reports",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SkillSet",
                table: "Workshops");

            migrationBuilder.DropColumn(
                name: "RoomId",
                table: "Reports");
        }
    }
}
