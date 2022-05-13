package Placeholder.backend.Controller;

import Placeholder.backend.DAO.*;
import Placeholder.backend.Model.Post;
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
    public Object createUser(@RequestBody  HashMap<String, String> body){

        System.out.println("\n****************\n"+"createUser"+"\n****************\n");


        if( !body.containsKey("cs_mail") || !body.get("cs_mail").endsWith("@cs.hacettepe.edu.tr")){
            return DAOFunctions.getResponse(400,"error","Please use a Hacettepe CS mail.");
        }
        if(!body.containsKey("user_password") || !body.containsKey("user_type") || !body.containsKey("full_name") ||
                body.get("user_password") == null || body.get("user_type") == null || body.get("cs_mail") == null || body.get("full_name") == null){
            return DAOFunctions.getResponse(400,"",null);
        }

        if(!body.containsKey("phone")){
            body.put("phone","");
        }
        if(!body.containsKey("company")){
            body.put("company","");
        }
        if(!body.containsKey("linkedIn_url")){
            body.put("linkedIn_url","");
        }
        if(!body.containsKey("github_url")){
            body.put("github_url","");
        }
        if(!body.containsKey("alt_mail")){
            body.put("alt_mail","");
        }
        if(!body.containsKey("profile_pic_path")){
            body.put("profile_pic_path","");
        }
        if(!body.containsKey("cover_url")){
            body.put("cover_url","");
        }

        User u = new User(0,body.get("full_name"),body.get("user_type"), body.get("cs_mail"), body.get("user_password"),body.get("phone"),body.get("company"),body.get("linkedIn_url"),body.get("github_url"),body.get("alt_mail"),body.get("profile_pic_path"),body.get("cover_url"));
        u.setUser_password(Integer.toString(body.get("user_password").hashCode()));
        u = UserDAO.createUser(u);

        if(u != null && u.getId() != 0){
            return DAOFunctions.getResponse(200,"user",u);
        }
        else if(u.getId() == 0){
            return DAOFunctions.getResponse(400,"error","Already Registered");
        }
        else{
            return DAOFunctions.getResponse(400,"",null);
        }
    }

    @GetMapping("/user/login")
    public Object login(@RequestParam (value = "cs_mail",defaultValue = "")String cs_mail, @RequestParam (value = "user_password",defaultValue = "")String user_password){

        System.out.println("\n****************\n"+"login"+"\n****************\n");


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

        System.out.println("\n****************\n"+"getUser"+"\n****************\n");


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
    public Object getProfileData(@RequestParam(value = "requested_id",defaultValue = "") String requested_id, @RequestParam(value = "current_user_id",defaultValue = "") String current_user_id){

        System.out.println("\n****************\n"+"getProfileData"+"\n****************\n");


        if(requested_id.equals("") || current_user_id.equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }

        HashMap<String,Object> profileData = UserDAO.getProfileData(current_user_id,requested_id);
        if(profileData == null){
            return DAOFunctions.getResponse(400,"",null);
        }
        if(!current_user_id.equals(requested_id)  && !(boolean)profileData.get("connected")){
            profileData.put("connection_request_code",ConnectionRequestDAO.checkRequest(current_user_id,requested_id));

        }
        profileData.put("posts", PostDAO.getAllPostsOfAUser(requested_id));
        return DAOFunctions.getResponseWithMap(200, profileData);

    }

    @GetMapping("/user/getAllUsers")
    public Object getAllUsers(){

        System.out.println("\n****************\n"+"getAllUsers"+"\n****************\n");


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

        System.out.println("\n****************\n"+"deleteUser"+"\n****************\n");


        if(!body.containsKey("user_id") || body.get("user_id").equals("") ||
            !body.containsKey("cs_mail") || body.get("cs_mail").equals("") ||
            !body.containsKey("user_password") || body.get("user_password").equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        User u = UserDAO.login(body.get("cs_mail"),body.get("user_password"));
        if(u == null){
            return DAOFunctions.getResponse(400,"error","Wrong mail or password");
        }
        PostDAO.deleteAllPostsOfAUser(body.get("user_id"));
        PostDAO.deleteAllLikesOfAUser(body.get("user_id"));
        PostDAO.deleteAllCommentsOfAUser(body.get("user_id"));
        ConnectionDAO.removeAllConnections(body.get("user_id"));
        ConnectionRequestDAO.removeAllRequests(body.get("user_id"));
        EventDAO.deleteAllEventsOfAUser(body.get("user_id"));
        EventDAO.deleteAllAttendOfAUser(body.get("user_id"));
        MessageDAO.deleteAllMessagesOfAUser(body.get("user_id"));
        return DAOFunctions.getResponse(UserDAO.deleteUser(body.get("user_id")),"",null);

    }

    @PatchMapping("/user/updateUser")
    public Object updateUser(@RequestBody User user){

        System.out.println("\n****************\n"+"updateUser"+"\n****************\n");

        if(user.getId() == 0 || user.getUser_type() == null || user.getFull_name() == null || user.getCs_mail() == null || !user.getCs_mail().endsWith("@cs.hacettepe.edu.tr")){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(UserDAO.updateUser(user),"",null);
    }

    @GetMapping("/user/searchUser")
    public Object searchUser(@RequestParam (value = "current_user_id",defaultValue = "")String current_user_id, @RequestParam (value = "query",defaultValue = "")String query){

        System.out.println("\n****************\n"+"searchUser"+"\n****************\n");


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

        System.out.println("\n****************\n"+"updatePassword"+"\n****************\n");

        if(!body.containsKey("new_password") || !body.containsKey("old_password") || !body.containsKey("cs_mail") ||
                body.get("new_password").equals("") || body.get("old_password").equals("") || body.get("cs_mail").equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(UserDAO.updatePassword(body.get("cs_mail"),body.get("old_password"),body.get("new_password")),"",null);
    }

    @PatchMapping("/user/updateUserType")
    public Object updateUserType(@RequestBody  HashMap<String, String> body){

        System.out.println("\n****************\n"+"updateUserType"+"\n****************\n");

        if(!body.containsKey("current_user_id") || !body.containsKey("user_type") ||
                body.get("current_user_id").equals("") || body.get("user_type").equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(UserDAO.updateUserType(body.get("user_type"),body.get("current_user_id")),"",null);
    }
    @GetMapping("/user/getUsersConnected")
    public static Object getUsersConnected(@RequestParam (value = "current_user_id",defaultValue = "")String current_user_id){

        System.out.println("\n****************\n"+"getUsersConnected"+"\n****************\n");


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

        System.out.println("\n****************\n"+"getConnectionRequestedUsers"+"\n****************\n");


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

        System.out.println("\n****************\n"+"getConnectionReceivedUsers"+"\n****************\n");


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
