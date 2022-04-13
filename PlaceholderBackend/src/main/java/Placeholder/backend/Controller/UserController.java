package Placeholder.backend.Controller;

import Placeholder.backend.DAO.ConnectionDAO;
import Placeholder.backend.DAO.ConnectionRequestDAO;
import Placeholder.backend.DAO.UserDAO;
import Placeholder.backend.Model.ConnectionRequest;
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
    public Object login(@RequestParam(value = "cs_mail",defaultValue = "") String cs_mail, @RequestParam(value = "user_password",defaultValue = "")String user_password){

        if(cs_mail.equals("") || user_password.equals("")){

            return DAOFunctions.getResponse(400,"",null);
        }
        User u = UserDAO.login(cs_mail,user_password);

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
    public Object getProfileData(@RequestParam(value = "current_user_id",defaultValue = "") String current_user_id ,@RequestParam(value = "requested_id",defaultValue = "") String requested_id){

        if(current_user_id.equals("") || requested_id.equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }

        HashMap<String,Object> profileData = UserDAO.getProfileData(current_user_id,requested_id);
        if(profileData == null){
            return DAOFunctions.getResponse(400,"",null);
        }
        if(!current_user_id.equals(requested_id)  && !(boolean)profileData.get("connected")){
            profileData.put("connection_request_code",ConnectionRequestDAO.checkRequest(current_user_id,requested_id));

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
    public Object deleteUser(@RequestParam(value = "current_user_id") String current_user_id){

        if(current_user_id.equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        ConnectionDAO.removeAllConnections(current_user_id);
        ConnectionRequestDAO.removeAllRequests(current_user_id);
        return DAOFunctions.getResponse(UserDAO.deleteUser(current_user_id),"",null);

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
    public Object updatePassword(@RequestParam(value = "cs_mail",defaultValue = "") String cs_mail, @RequestParam(value = "old_password",defaultValue = "") String old_password, @RequestParam(value = "new_password",defaultValue = "")String new_password){

        if(new_password.equals("") ||old_password.equals("") || cs_mail.equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(UserDAO.updatePassword(cs_mail,old_password,new_password),"",null);
    }

    @PatchMapping("/user/updateUserType")
    public Object updateUserType(@RequestParam(value = "user_type",defaultValue = "") String user_type, @RequestParam (value = "current_user_id",defaultValue = "")String current_user_id){
        if(current_user_id.equals("") || user_type.equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(UserDAO.updateUserType(user_type,current_user_id),"",null);
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
