#r "System.Configuration"
#r "System.Data"

using System.Net;
using System.Configuration;
using System.Data.SqlClient;
using System.Threading.Tasks;

public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, TraceWriter log)
{

    dynamic data = await req.Content.ReadAsAsync<object>();
    
    string usr = data?.usr;
    string msg = data?.msg;

    log.Info($"User {usr} said: {msg}");

    var str = ConfigurationManager.ConnectionStrings["sqldb_con"].ConnectionString;
    using (SqlConnection conn = new SqlConnection(str))
    {
        conn.Open();
        var qry = $"INSERT INTO Chat(dt,usr,msg) VALUES( GetDate(),'{usr}','{msg}');"; // SQL injection ?

        using (SqlCommand cmd = new SqlCommand(qry, conn))
        {
            // Execute the command and log the # rows affected.
            var rows = await cmd.ExecuteNonQueryAsync();
            log.Info($"{rows} rows were updated");
        }
    }

    return usr == null || msg == null
        ? req.CreateResponse(HttpStatusCode.BadRequest, "Request body invalid.")
        : req.CreateResponse(HttpStatusCode.OK, "Hello " + usr);
}
