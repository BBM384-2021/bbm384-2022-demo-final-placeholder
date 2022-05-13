package Placeholder.backend.Controller;

import Placeholder.backend.DAO.ConnectionDAO;
import Placeholder.backend.Model.Connection;


import Placeholder.backend.Util.DAOFunctions;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;


@RestController
public class ConnectionController {


    @PostMapping("/connection/createConnection")
    public Object createConnection(@RequestBody Connection connection){

        System.out.println("\n****************\n"+"createConnection"+"\n****************\n");


        if(connection.getUser1_id() == 0 || connection.getUser2_id() == 0){
            return DAOFunctions.getResponse(400,"error","Missing Fields");
        }
        return DAOFunctions.getResponse(ConnectionDAO.createConnection(connection),"",null);
    }

    @GetMapping("/connection/checkConnection")
    public Object checkConnection(@RequestParam(value = "user1_id",defaultValue = "") String user1_id, @RequestParam(value = "user2_id",defaultValue = "") String user2_id){

        System.out.println("\n****************\n"+"checkConnection"+"\n****************\n");


        if(user1_id.equals("") || user2_id.equals("")){
            return DAOFunctions.getResponse(400,"error","Missing Fields");
        }
        return DAOFunctions.getResponse(200,"connected",ConnectionDAO.checkConnection(user1_id,user2_id));
    }

    @DeleteMapping("/connection/removeConnection")
    public Object removeConnection(@RequestBody HashMap<String, String> body){

        System.out.println("\n****************\n"+"removeConnection"+"\n****************\n");


        if(!body.containsKey("user1_id") || !body.containsKey("user2_id") ||
                body.get("user1_id").equals("") || body.get("user2_id").equals("")){
            return DAOFunctions.getResponse(400,"error","Missing Fields");
        }
        return DAOFunctions.getResponse(ConnectionDAO.removeConnection(body.get("user1_id"),body.get("user2_id")),"",null);

    }

    @DeleteMapping("/connection/deleteAllConnections")
    public Object removeAllConnections(@RequestBody HashMap<String, String> body){

        System.out.println("\n****************\n"+"deleteAllConnections"+"\n****************\n");


        if(!body.containsKey("user1_id") || body.get("user1_id").equals("")){
            return DAOFunctions.getResponse(400,"error","Missing Fields");
        }
        return DAOFunctions.getResponse(ConnectionDAO.removeAllConnections(body.get("user1_id")),"",null);


    }

    @GetMapping("/connection/getAllConnections")
    public Object getAllRequests(){

        System.out.println("\n****************\n"+"getAllConnections"+"\n****************\n");


        List<Connection> allConnections = ConnectionDAO.getAllConnections();
        if(allConnections != null){
            return DAOFunctions.getResponse(200,"allRequests",allConnections);
        }
        else{
            return DAOFunctions.getResponse(400,"",null);
        }
    }


}
