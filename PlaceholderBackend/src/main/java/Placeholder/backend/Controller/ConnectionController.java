package Placeholder.backend.Controller;

import Placeholder.backend.DAO.ConnectionDAO;
import Placeholder.backend.Model.Connection;


import Placeholder.backend.Util.DAOFunctions;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class ConnectionController {


    @PostMapping("/connection/createConnection")
    public Object createConnection(@RequestBody Connection connection){

        if(connection.getUser1_id() == 0 || connection.getUser2_id() == 0){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(ConnectionDAO.createConnection(connection),"",null);
    }

    @GetMapping("/connection/checkConnection")
    public Object checkConnection(@RequestParam(value = "user1_id",defaultValue = "") String user1_id ,@RequestParam(value = "user2_id",defaultValue = "") String user2_id){

        if(user1_id.equals("") || user2_id.equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(200,"connected",ConnectionDAO.checkConnection(user1_id,user2_id));
    }

    @DeleteMapping("/connection/removeConnection")
    public Object removeConnection(@RequestParam(value = "user1_id",defaultValue = "") String user1_id ,@RequestParam(value = "user2_id",defaultValue = "") String user2_id){

        if(user1_id.equals("") || user2_id.equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(ConnectionDAO.removeConnection(user1_id,user2_id),"",null);

    }

    @DeleteMapping("/connection/deleteAllConnections")
    public Object removeAllConnections(@RequestParam(value = "user_id",defaultValue = "") String user_id){

        if(user_id.equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(ConnectionDAO.removeAllConnections(user_id),"",null);


    }

    @GetMapping("/connection/getAllConnections")
    public Object getAllRequests(){

        List<Connection> allConnections = ConnectionDAO.getAllConnections();
        if(allConnections != null){
            return DAOFunctions.getResponse(200,"allRequests",allConnections);
        }
        else{
            return DAOFunctions.getResponse(400,"",null);
        }
    }


}
