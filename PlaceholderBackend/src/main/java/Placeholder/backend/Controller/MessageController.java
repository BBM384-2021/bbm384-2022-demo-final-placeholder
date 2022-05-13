package Placeholder.backend.Controller;

import Placeholder.backend.DAO.MessageDAO;
import Placeholder.backend.Model.Message;
import Placeholder.backend.Util.DAOFunctions;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
public class MessageController {

    @PostMapping("/message/send")
    public Object send(@RequestBody Message message){

        System.out.println("\n****************\n"+"send"+"\n****************\n");


        if(message.getsender_id() == 0 || message.getreceiver_id() == 0 || message.getBody() == null || message.getBody().equals("") || message.getDate() == null || message.getDate().equals("")){
            return DAOFunctions.getResponse(400,"error","Missing Fields");
        }
        return DAOFunctions.getResponse(MessageDAO.send(message),"",null);
    }

    @GetMapping("/message/getAllMessagesOfAUser")
    public Object getAllMessagesOfAUser(@RequestParam(value = "user_id",defaultValue = "") String user_id){

        System.out.println("\n****************\n"+"getAllMessagesOfAUser"+"\n****************\n");

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

        System.out.println("\n****************\n"+"getMessageLogForAUser"+"\n****************\n");


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

    @PatchMapping("/message/updateMessage")
    public Object updateMessage(@RequestBody Message message){

        System.out.println("\n****************\n"+"updateMessage"+"\n****************\n");


        if(message.getId() == 0 || message.getBody() == null || message.getBody().equals("")){
            return DAOFunctions.getResponse(400,"error","Missing Fields");
        }
        int res = MessageDAO.updateMessage(message);

        return DAOFunctions.getResponse(res,"",null);

    }
    @DeleteMapping("/message/deleteMessage")
    public Object deleteMessage(@RequestBody HashMap<String, String> body){

        System.out.println("\n****************\n"+"deleteMessage"+"\n****************\n");


        if(!body.containsKey("id") || body.get("id").equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(MessageDAO.deleteMessage(body.get("id")),"",null);
    }
}
