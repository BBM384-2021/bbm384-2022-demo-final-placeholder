package Placeholder.backend.Controller;

import Placeholder.backend.DAO.MessageDAO;
import Placeholder.backend.Model.Message;
import Placeholder.backend.Util.DAOFunctions;
import org.springframework.web.bind.annotation.*;

@RestController
public class MessageController {

    @PostMapping("/message/send")
    public Object send(@RequestBody Message message){

        if(message.getsender_id() == 0 || message.getreceiver_id() == 0 || message.getBody() == null || message.getBody().equals("") || message.getDate() == null || message.getDate().equals("")){
            return DAOFunctions.getResponse(400,"error","Missing Fields");
        }
        return DAOFunctions.getResponse(MessageDAO.send(message),"",null);
    }

    @GetMapping("/message/getAllMessagesOfAUser")
    public Object getAllMessagesOfAUser(@RequestParam(value = "user_id",defaultValue = "") String user_id){
        if(user_id.equals("")){
            return DAOFunctions.getResponse(400,"error","Missing Fields");
        }
        Object res = MessageDAO.getAllMessagesOfAUser(user_id);
        if(res != null){
            return DAOFunctions.getResponse(200,"messages",res);
        }
        else{
            return DAOFunctions.getResponse(400,"",null);
        }
    }

    @GetMapping("/message/getMessageLogForAUser")
    public Object getMessageLogForAUser(@RequestParam(value = "current_user_id",defaultValue = "") String current_user_id, @RequestParam(value = "other_user_id",defaultValue = "") String other_user_id){
        if(current_user_id.equals("") || other_user_id.equals("")){
            return DAOFunctions.getResponse(400,"error","Missing Fields");
        }
        Object res = MessageDAO.getMessageLogForAUser(current_user_id,other_user_id);
        if(res != null){
            return DAOFunctions.getResponse(200,"messages",res);
        }
        else{
            return DAOFunctions.getResponse(400,"",null);
        }
    }
}
