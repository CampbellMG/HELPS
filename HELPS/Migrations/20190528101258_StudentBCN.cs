using Microsoft.EntityFrameworkCore.Migrations;

namespace HELPS.Migrations
{
    public partial class StudentBCN : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BestContactNumber",
                table: "Students",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BestContactNumber",
                table: "Students");
        }
    }
}
