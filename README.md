## UTS HELPS Project (41095 - Software Engineering Studio 2A/2B)

- [Setting up a development environment [Front & Backend]](#setting-up-a-development-environment-front--backend)
- [OpenAPI Specification](#openapi-specification)

Skip to [OpenAPI Specification](#openapi-specification) to view the backend API help pages with Swagger / OpenAPI.

### Setting up a development environment [Front & Backend]

1. Download and install [ASP.net Core](https://dotnet.microsoft.com/download)
2. Download and install [Node](https://nodejs.org/en/download/)
3. Download and install [PostgreSQL](https://www.postgresql.org/download/) **(Take note of the password entered during installation)**
4. Clone this repo and open in your preferred IDE (Must support C#, if unsure use Visual Studio)
5. Open HELPS/appsettings.json and replace \<POSTGRESQL PASSWORD> with the password from step **3**
6. Open a terminal and move into the ClientApp directory
    ```
    cd <Project Directory>/HELPS/ClientApp
    ```
7. Run the following command to install node dependencies
    ```
    npm install
    ```
8. Move back into the HELPS directory
    ```
    cd ..
    ```
9. Run the following command to build a database per the .net entity model
    ```
    dotnet ef database update
    ```
10. Start the project by running the following command or through your IDE's run config:
    ```
    dotnet run
    ```
11. The command should output the local address of the project, open the link
    > Now listening on: https://localhost:5001
12. You should be presented with the HELPS login page

    ![alt text](https://i.imgur.com/AZ80Tfx.png "Initial State")

13. If the project displays something like **"Unhandled Rejection (SyntaxError)"**, you likely have clicked the wrong output link or have not configured your database correctly.

    If you can run queries against your database (See steps **13** - **16**), repeat step **5** ensuring the password is correct and does not include quotes or these symbols "<>"

14. Ensure there is a database "HELPS" that contains a public schema with tables representing each of the models (except reports) within the Models directory, if any are not present repeat step **8** and ensure there are no errors in the output
15. Add a new row to the "Users" table and use those details to login

### OpenAPI Specification

The Swagger UI will allow you to see and test all backend endpoints from your browser. This is helpful for beginners who want to perform test the endpoints but don't know where to start.

The Swagger UI can be found at `http://localhost:<port>/swagger`. To learn more about Swagger / OpenAPI, refer to [ASP.NET Core web API help pages with Swagger / OpenAPI](https://docs.microsoft.com/en-us/aspnet/core/tutorials/web-api-help-pages-using-swagger?view=aspnetcore-2.2)

![](images/localhost_5001_swagger_index.html.png)
