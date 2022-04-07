package Placeholder.backend.Controller;

import Placeholder.backend.DAO.UserDAO;
import Placeholder.backend.Model.User;



import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
public class UserController {

    @PostMapping("/user/createUser")
    public int createUser(@RequestBody User user){
        System.out.println(user);
        if(user.getUser_password() == null){
            return 400;
        }
        return UserDAO.createUser(user);
    }

    @GetMapping("/user/login")
    public User login(@RequestParam(value = "cs_mail",defaultValue = "") String cs_mail, @RequestParam(value = "user_password",defaultValue = "")String user_password){

        System.out.println(cs_mail);
        System.out.println(user_password);
        if(cs_mail.equals("") || user_password.equals("")){

            return null;
        }

        return UserDAO.login(cs_mail,user_password);
    }

    @GetMapping("/user/getUser")
    public User getUser(@RequestParam(value = "current_user_id",defaultValue = "") String current_user_id ,@RequestParam(value = "requested_id",defaultValue = "") String requested_id){

        if(current_user_id.equals("") || requested_id.equals("")){
            return null;
        }
        return UserDAO.getUser(current_user_id,requested_id);

    }

    @GetMapping("/user/getAllUsers")
    public List<User> getAllUsers(){
        return UserDAO.getAllUsers();
    }

    @DeleteMapping("/user/deleteUser")
    public int deleteUser(@RequestParam(value = "current_user_id") String current_user_id){

        if(current_user_id.equals("")){
            return 400;
        }

        return UserDAO.deleteUser(current_user_id);

    }

    @PatchMapping("/user/updateUser")
    public int updateUser(@RequestBody User user){
        if(user.getId() == 0){
            return 400;
        }
        return UserDAO.updateUser(user);
    }

    @GetMapping("/user/searchUser")
    public List<User> searchUser(@RequestParam (value = "current_user_id",defaultValue = "")String current_user_id, @RequestParam (value = "query",defaultValue = "")String query){

        if(query.equals("") || current_user_id.equals("")){
            return null;
        }
        return UserDAO.searchUser(current_user_id,query);

    }

    @PatchMapping("/user/updatePassword")
    public int updatePassword(@RequestParam(value = "cs_mail",defaultValue = "") String cs_mail, @RequestParam(value = "old_password",defaultValue = "") String old_password, @RequestParam(value = "new_password",defaultValue = "")String new_password){

        if(new_password.equals("") ||old_password.equals("")){
            return 400;
        }
        return UserDAO.updatePassword(cs_mail,old_password,new_password);
    }

    @PatchMapping("/user/updateUserType")
    public int updateUserType(@RequestParam(value = "user_type",defaultValue = "0") String user_type, @RequestParam (value = "current_user_id",defaultValue = "")String current_user_id){
        if(current_user_id.equals("")){
            return 400;
        }

        return UserDAO.updateUserType(user_type,current_user_id);
    }




}
