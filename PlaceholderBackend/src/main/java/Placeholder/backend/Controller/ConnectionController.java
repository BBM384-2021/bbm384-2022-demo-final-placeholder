package Placeholder.backend.Controller;

import Placeholder.backend.DAO.ConnectionDAO;
import Placeholder.backend.Model.Connection;


import org.springframework.web.bind.annotation.*;


@RestController
public class ConnectionController {


    @PostMapping("/connection/createConnection")
    public int createConnection(@RequestBody Connection connection){

        if(connection.getUser1_id() == 0 || connection.getUser2_id() == 0){
            return 400;
        }
        return ConnectionDAO.createConnection(connection);
    }

    @GetMapping("/connection/checkConnection")
    public static boolean checkConnection(@RequestParam(value = "user1_id",defaultValue = "") String user1_id ,@RequestParam(value = "user2_id",defaultValue = "") String user2_id){

        if(user1_id.equals("") || user2_id.equals("")){
            return false;
        }

        return ConnectionDAO.checkConnection(user1_id,user2_id);

    }

    @DeleteMapping("/connection/removeConnection")
    public static int removeConnection(@RequestParam(value = "user1_id",defaultValue = "") String user1_id ,@RequestParam(value = "user2_id",defaultValue = "") String user2_id){

        if(user1_id.equals("") || user2_id.equals("")){
            return 400;
        }

       return ConnectionDAO.removeConnection(user1_id,user2_id);


    }

    @DeleteMapping("/connection/deleteAllConnections")
    public static int removeAllConnections(@RequestParam(value = "user_id",defaultValue = "") String user_id){

        if(user_id.equals("")){
            return 400;
        }

        return ConnectionDAO.removeAllConnections(user_id);


    }


}
