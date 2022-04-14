package Placeholder.backend.Controller;

import Placeholder.backend.DAO.ConnectionDAO;
import Placeholder.backend.DAO.ConnectionRequestDAO;
import Placeholder.backend.DAO.UserDAO;
import Placeholder.backend.Model.User;


import Placeholder.backend.Util.DAOFunctions;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@RestController
public class UserController {

    @PostMapping("/user/createUser")
    public Object createUser(@RequestBody User user){
        if(user.getUser_password() == null || user.getUser_type() == null || user.getFull_name() == null || user.getCs_mail() == null || !user.getCs_mail().endsWith("@cs.hacettepe.edu.tr")){
            return DAOFunctions.getResponse(400,"",null);
        }
        User u = UserDAO.createUser(user);

        if(u != null){
            return DAOFunctions.getResponse(200,"user",u);
        }
        else{
            return DAOFunctions.getResponse(400,"",null);
        }
    }

    @GetMapping("/user/login")
    public Object login(@RequestBody  HashMap<String, String> body){

        if(!body.containsKey("cs_mail") || !body.containsKey("user_password") ||
                body.get("cs_mail").equals("") || body.get("user_password").equals("")){

            return DAOFunctions.getResponse(400,"",null);
        }
        User u = UserDAO.login(body.get("cs_mail"),body.get("user_password"));

        if(u != null){
            return DAOFunctions.getResponse(200,"user",u);
        }
        else{
            return DAOFunctions.getResponse(400,"",null);
        }
    }

    @GetMapping("/user/getUser")
    public Object getUser(@RequestParam(value = "requested_id",defaultValue = "") String requested_id){

        if(requested_id.equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        User u = UserDAO.getUser(requested_id);
        if(u != null){
            return DAOFunctions.getResponse(200,"user",u);
        }
        else{
            return DAOFunctions.getResponse(400,"",null);
        }

    }
    @GetMapping("/user/getProfileData")
    public Object getProfileData(@RequestBody  HashMap<String, String> body){

        if(!body.containsKey("current_user_id") || !body.containsKey("requested_id") ||
                body.get("current_user_id").equals("") || body.get("requested_id").equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }

        HashMap<String,Object> profileData = UserDAO.getProfileData(body.get("current_user_id"),body.get("requested_id"));
        if(profileData == null){
            return DAOFunctions.getResponse(400,"",null);
        }
        if(!body.get("current_user_id").equals(body.get("requested_id"))  && !(boolean)profileData.get("connected")){
            profileData.put("connection_request_code",ConnectionRequestDAO.checkRequest(body.get("current_user_id"),body.get("requested_id")));

        }
        return DAOFunctions.getResponseWithMap(200, profileData);

    }

    @GetMapping("/user/getAllUsers")
    public Object getAllUsers(){

        List<User> allUsers = UserDAO.getAllUsers();
        if(allUsers != null){
            return DAOFunctions.getResponse(200,"allUsers",allUsers);
        }
        else{
            return DAOFunctions.getResponse(400,"",null);
        }
    }

    @DeleteMapping("/user/deleteUser")
    public Object deleteUser(@RequestBody  HashMap<String, String> body){

        if(!body.containsKey("user_id") || body.get("user_id").equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        ConnectionDAO.removeAllConnections(body.get("user_id"));
        ConnectionRequestDAO.removeAllRequests(body.get("user_id"));
        return DAOFunctions.getResponse(UserDAO.deleteUser(body.get("user_id")),"",null);

    }

    @PatchMapping("/user/updateUser")
    public Object updateUser(@RequestBody User user){
        if(user.getId() == 0 || user.getUser_type() == null || user.getFull_name() == null || user.getCs_mail() == null || !user.getCs_mail().endsWith("@cs.hacettepe.edu.tr")){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(UserDAO.updateUser(user),"",null);
    }

    @GetMapping("/user/searchUser")
    public Object searchUser(@RequestParam (value = "current_user_id",defaultValue = "")String current_user_id, @RequestParam (value = "query",defaultValue = "")String query){

        if(query.equals("") || current_user_id.equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        List<List<User>> searchResult = UserDAO.searchUser(current_user_id,query);
        if(searchResult != null){
            return DAOFunctions.getResponseWithMultipleObjects(200,new ArrayList<>(Arrays. asList("connectedUsers","nonConnectedUsers")),new ArrayList<Object>(Arrays. asList(searchResult.get(0),searchResult.get(1))));
        }
        else{
            return DAOFunctions.getResponse(400,"",null);
        }

    }

    @PatchMapping("/user/updatePassword")
    public Object updatePassword(@RequestBody  HashMap<String, String> body){
        if(!body.containsKey("new_password") || !body.containsKey("old_password") || !body.containsKey("cs_mail") ||
                body.get("new_password").equals("") || body.get("old_password").equals("") || body.get("cs_mail").equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(UserDAO.updatePassword(body.get("cs_mail"),body.get("old_password"),body.get("new_password")),"",null);
    }

    @PatchMapping("/user/updateUserType")
    public Object updateUserType(@RequestBody  HashMap<String, String> body){
        if(!body.containsKey("current_user_id") || !body.containsKey("user_type") ||
                body.get("current_user_id").equals("") || body.get("user_type").equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(UserDAO.updateUserType(body.get("user_type"),body.get("current_user_id")),"",null);
    }
    @GetMapping("/user/getUsersConnected")
    public static Object getUsersConnected(@RequestParam (value = "current_user_id",defaultValue = "")String current_user_id){


        if(current_user_id.equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        List<User> connectedUsers = UserDAO.getUsersConnected(current_user_id);
        if(connectedUsers != null){
            return DAOFunctions.getResponse(200,"connectedUsers",connectedUsers);
        }
        else{
            return DAOFunctions.getResponse(400,"",null);
        }

    }
    @GetMapping("user/getConnectionRequestedUsers")
    public static Object getConnectionRequestedUsers(@RequestParam (value = "current_user_id",defaultValue = "")String current_user_id){

        if(current_user_id.equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        List<User> requestedUsers = UserDAO.getConnectionRequestedUsers(current_user_id);
        if(requestedUsers != null){
            return DAOFunctions.getResponse(200,"requestedUsers",requestedUsers);
        }
        else{
            return DAOFunctions.getResponse(400,"",null);
        }
    }

    @GetMapping("user/getConnectionReceivedUsers")
    public static Object getConnectionReceivedUsers(@RequestParam (value = "current_user_id",defaultValue = "")String current_user_id){

        if(current_user_id.equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        List<User> requestedUsers = UserDAO.getConnectionReceivedUsers(current_user_id);
        if(requestedUsers != null){
            return DAOFunctions.getResponse(200,"receivedUsers",requestedUsers);
        }
        else{
            return DAOFunctions.getResponse(400,"",null);
        }
    }




}
