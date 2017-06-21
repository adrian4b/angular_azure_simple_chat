#r "System.Configuration"
#r "System.Data"

using System.Net;
using System.Configuration;
using System.Data.SqlClient;
using System.Data.Common;
using System.Threading.Tasks;

public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, TraceWriter log)
{
    var chat = new List<Chat>();
    log.Info("Received a request for chat messages");

    var str = ConfigurationManager.ConnectionStrings["sqldb_con"].ConnectionString;
    using (SqlConnection conn = new SqlConnection(str))
    {
        conn.Open();
        var qry = $"Select top 3 dt,usr,msg FROM CHAT ORDER BY Id ";

        using (SqlCommand cmd = new SqlCommand(qry, conn))
        {
            
            var dataReader =  await cmd.ExecuteReaderAsync();

             while(dataReader.Read()){
                
                chat.Add(new Chat{
                    Dt = dataReader["dt"].ToString(),
                    Msg = dataReader["msg"].ToString(),
                    Usr = dataReader["usr"].ToString()
                });
            }
            
        }
    }

    return chat.Count == 0
        ? req.CreateResponse(HttpStatusCode.BadRequest, "Something wrong with getting the messages")
        : req.CreateResponse(HttpStatusCode.OK, chat);
}


public class Chat{
    public string Dt {get;set;}
    public string Usr {get;set;}
    public string Msg {get;set;}
}