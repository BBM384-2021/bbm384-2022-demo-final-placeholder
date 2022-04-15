package Placeholder.backend.Controller;

import Placeholder.backend.DAO.ConnectionDAO;
import Placeholder.backend.DAO.ConnectionRequestDAO;
import Placeholder.backend.Model.Connection;
import Placeholder.backend.Model.ConnectionRequest;
import Placeholder.backend.Util.DAOFunctions;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
public class ConnectionRequestController {

    @PostMapping("/connectionRequest/createRequest")
    public Object createRequest(@RequestBody ConnectionRequest connectionRequest){

        if(connectionRequest.getSender_id() == 0 || connectionRequest.getReceiver_id() == 0){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(ConnectionRequestDAO.createRequest(connectionRequest),"",null);
    }

    @DeleteMapping("/connectionRequest/removeRequest")
    public Object removeRequest(@RequestBody HashMap<String, String> body){

        if(!body.containsKey("current_user_id") || !body.containsKey("other_user_id") ||
                body.get("current_user_id").equals("") || body.get("other_user_id").equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(ConnectionRequestDAO.removeRequest(body.get("current_user_id"),body.get("other_user_id")),"",null);
    }

    @GetMapping("/connectionRequest/checkRequest")
    public Object checkRequest(@RequestBody HashMap<String, String> body){

        if(!body.containsKey("current_user_id") || !body.containsKey("other_user_id") ||
                body.get("current_user_id").equals("") || body.get("other_user_id").equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(200,"requested_code",ConnectionRequestDAO.checkRequest(body.get("current_user_id"),body.get("other_user_id")));
    }

    @DeleteMapping("/connectionRequest/acceptRequest")
    public Object acceptRequest(@RequestBody ConnectionRequest connectionRequest){

        if(connectionRequest.getSender_id() == 0 || connectionRequest.getReceiver_id() == 0){
            return DAOFunctions.getResponse(400,"",null);
        }
        int deleteResponse = ConnectionRequestDAO.removeRequest(Integer.toString(connectionRequest.getSender_id()),Integer.toString(connectionRequest.getReceiver_id()));
        if(deleteResponse == 200){
            return DAOFunctions.getResponse(ConnectionDAO.createConnection(new Connection(0,connectionRequest.getReceiver_id(),connectionRequest.getSender_id())),"",null);
        }
        else{
            return DAOFunctions.getResponse(400,"",null);
        }

    }

    @GetMapping("/connectionRequest/getAllRequests")
    public Object getAllRequests(){

        List<ConnectionRequest> allRequests = ConnectionRequestDAO.getAllRequests();
        if(allRequests != null){
            return DAOFunctions.getResponse(200,"allRequests",allRequests);
        }
        else{
            return DAOFunctions.getResponse(400,"",null);
        }
    }
}
