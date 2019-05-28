using Microsoft.EntityFrameworkCore.Migrations;

namespace HELPS.Migrations
{
    public partial class StudentPropertiesComplete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CountryOfOrigin",
                table: "Students",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Course",
                table: "Students",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DOB",
                table: "Students",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Degree",
                table: "Students",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EducationalBackground",
                table: "Students",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Students",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Faculty",
                table: "Students",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstLanguage",
                table: "Students",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Gender",
                table: "Students",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "HasCompletedCAF",
                table: "Students",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "HomePhone",
                table: "Students",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsSpecialNeeds",
                table: "Students",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "MobileNumber",
                table: "Students",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Other",
                table: "Students",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PrefFirstName",
                table: "Students",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RegisteredDate",
                table: "Students",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Students",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Year",
                table: "Students",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CountryOfOrigin",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Course",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "DOB",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Degree",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "EducationalBackground",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Faculty",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "FirstLanguage",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "HasCompletedCAF",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "HomePhone",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "IsSpecialNeeds",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "MobileNumber",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Other",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "PrefFirstName",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "RegisteredDate",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "Students");
        }
    }
}
