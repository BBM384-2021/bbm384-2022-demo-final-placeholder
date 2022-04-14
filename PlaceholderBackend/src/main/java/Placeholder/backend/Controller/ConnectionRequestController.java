package Placeholder.backend.Controller;

import Placeholder.backend.DAO.ConnectionDAO;
import Placeholder.backend.DAO.ConnectionRequestDAO;
import Placeholder.backend.Model.Connection;
import Placeholder.backend.Model.ConnectionRequest;
import Placeholder.backend.Util.DAOFunctions;
import org.springframework.web.bind.annotation.*;

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
    public Object removeConnection(@RequestBody ConnectionRequest connectionRequest){

        if(connectionRequest.getSender_id() == 0 || connectionRequest.getReceiver_id() == 0){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(ConnectionRequestDAO.removeRequest(connectionRequest),"",null);
    }

    @GetMapping("/connectionRequest/checkRequest")
    public Object checkConnection(@RequestBody ConnectionRequest connectionRequest){

        if(connectionRequest.getSender_id() == 0 || connectionRequest.getReceiver_id() == 0){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(200,"requested",ConnectionRequestDAO.checkRequest(connectionRequest));
    }

    @DeleteMapping("/connectionRequest/acceptRequest")
    public Object acceptRequest(@RequestBody ConnectionRequest connectionRequest){

        if(connectionRequest.getSender_id() == 0 || connectionRequest.getReceiver_id() == 0){
            return DAOFunctions.getResponse(400,"",null);
        }
        int deleteResponse = ConnectionRequestDAO.removeRequest(connectionRequest);
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
