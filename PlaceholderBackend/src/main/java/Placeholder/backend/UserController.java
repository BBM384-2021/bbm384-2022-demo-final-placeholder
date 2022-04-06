package Placeholder.backend;

import com.google.gson.Gson;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;


import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@RestController
public class UserController {

    public static SessionFactory createFactory(){
        return new Configuration().
                configure("hibernate.cfg.xml").
                addAnnotatedClass(User.class).addAnnotatedClass(Connection.class).
                buildSessionFactory();
    }

    @PostMapping("/user/createUser")
    public int createUser(@RequestBody User user){
        System.out.println(user);
        if(user.getUser_password() == null){
            return 400;
        }
        user.setUser_password(Integer.toString(user.getUser_password().hashCode()));

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            List<User> users= session.createQuery(String.format("from User u WHERE u.cs_mail = '%s'",user.getCs_mail())).getResultList();
            if(users.size() == 0){
                session.save(user);

            }
            else{
                return 400;
            }
            session.getTransaction().commit();
        }
        catch (Exception e){
            return 400;
        }
        finally {
            factory.close();
        }
        return 200;
    }

    @GetMapping("/user/login")
    public User login(@RequestParam(value = "cs_mail",defaultValue = "") String cs_mail, @RequestParam(value = "user_password",defaultValue = "")String user_password){

        System.out.println(cs_mail);
        System.out.println(user_password);
        if(cs_mail.equals("") || user_password.equals("")){

            return null;
        }

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        User user = null;
        String hashedPassword = Integer.toString(user_password.hashCode());

        try{
            session.beginTransaction();
            List<User> users= session.createQuery(String.format("from User u WHERE u.cs_mail = '%s' and u.user_password = '%s'",cs_mail,hashedPassword)).getResultList();
            if(users.size() == 0){
                return null;
            }
            user = users.get(0);
            System.out.println(user);
            session.getTransaction().commit();

        }
        catch (Exception e){
            return null;
        }
        finally {
            factory.close();
        }
        return user;
    }

    @GetMapping("/user/getUser")
    public static User getUser(@RequestParam(value = "current_user_id",defaultValue = "") String current_user_id ,@RequestParam(value = "requested_id",defaultValue = "") String requested_id){

        if(current_user_id.equals("") || requested_id.equals("")){
            return null;
        }

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        User user = null;

        try{
            session.beginTransaction();
            List<User> users= session.createQuery("from User u WHERE u.id = "+requested_id).getResultList();
            if(users.size() == 0){
                return null;
            }
            user = users.get(0);
            session.getTransaction().commit();
            user.setUser_password("");
            System.out.println(user);

            user.setIs_connected(ConnectionController.checkConnection(current_user_id,requested_id));

        }
        catch (Exception e){
            System.out.println(e);
            return null;
        }
        finally {
            factory.close();
        }
        return user;

    }

    @GetMapping("/user/getAllUsers")
    public List<User> getAllUsers(){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        List<User> allUsers = null;
        try{
            session.beginTransaction();
            allUsers = session.createQuery("from User u").getResultList();
            session.getTransaction().commit();
            for(User u : allUsers){
                u.setUser_password("");
            }
            System.out.println(allUsers);
        }
        finally {
            factory.close();
        }

        return allUsers;
    }

    @DeleteMapping("/user/deleteUser")
    public int deleteUser(@RequestParam(value = "current_user_id") String current_user_id){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            session.createQuery("delete from User s where s.id = "+current_user_id).executeUpdate();
            session.getTransaction().commit();
            ConnectionController.removeAllConnections(current_user_id);
        }
        catch (Exception e){
            System.out.println(e);
            return 400;
        }
        finally {
            factory.close();
        }

        return 200;


    }

    @PatchMapping("/user/updateUser")
    public int updateUser(@RequestBody User user){
        if(user.getId() == 0){
            return 400;
        }
        SessionFactory factory = createFactory();

        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            session.createQuery(String.format("update User u SET u.full_name = '%s' , u.user_type = '%s' ,  u.cs_mail = '%s' , u.phone = '%s' , u.company = '%s' , u.link = '%s' , u.alt_mail = '%s' , u.profile_pic_path = '%s'  WHERE u.id = '%s' "
                    ,user.getFull_name(),user.getUser_type(),user.getCs_mail(),user.getPhone(),user.getCompany(),user.getLink(),user.getAlt_mail(),user.getProfile_pic_path(),user.getId())).executeUpdate();
            session.getTransaction().commit();

        }
        catch (Exception e){
            factory.close();
            return 400;
        }
        finally {
            factory.close();
        }
        return 200;
    }

    @GetMapping("/user/searchUser")
    public List<User> searchUser(@RequestParam (value = "current_user_id",defaultValue = "")String current_user_id, @RequestParam (value = "query",defaultValue = "")String query){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        List<User> allUsers = new ArrayList<>();
        List<Object> queryResult = null;
        try{
            HashSet<Integer> found = new HashSet<>();
            Gson gson = new Gson();
            session.beginTransaction();
            queryResult = session.createQuery(String.format("from User u INNER JOIN Connection c ON user1_id = '%s' and user2_id = u.id WHERE u.full_name LIKE '%s'",current_user_id,(query+"%"))).getResultList();
            System.out.println(allUsers);
            for(Object o : queryResult){
                System.out.println("asdas"+o);
                String jsonStr = ((Object[]) o)[0].toString();
                System.out.println(jsonStr.substring(4));
                User u = gson.fromJson(jsonStr.substring(4), User.class);
                u.setIs_connected(true);
                allUsers.add(u);
                found.add(u.getId());
            }
            queryResult = session.createQuery(String.format("from User u WHERE u.full_name LIKE '%s'",(query+"%"))).getResultList();
            for(Object o : queryResult){
                String jsonStr = o.toString();
                System.out.println(jsonStr.substring(4));
                User u = gson.fromJson(jsonStr.substring(4), User.class);
                if(!found.contains(u.getId())){
                    allUsers.add(u);
                }
            }
            session.getTransaction().commit();
            System.out.println(allUsers);
        }
        finally {
            factory.close();
        }

        return allUsers;

    }

    @PatchMapping("/user/updatePassword")
    public int updatePassword(@RequestParam(value = "cs_mail",defaultValue = "") String cs_mail, @RequestParam(value = "old_password",defaultValue = "") String old_password, @RequestParam(value = "new_password",defaultValue = "")String new_password){

        if(new_password.equals("") ||old_password.equals("")){
            return 400;
        }

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        User user = null;
        String hashedPassword = Integer.toString(old_password.hashCode());

        try{
            session.beginTransaction();
            List<User> users= session.createQuery(String.format("from User u WHERE u.user_password = '%s' and u.cs_mail = '%s'",hashedPassword,cs_mail)).getResultList();
            if(users.size() == 0){
                return 400;
            }
            user = users.get(0);
            user.setUser_password(Integer.toString(new_password.hashCode()));
            session.getTransaction().commit();

        }
        catch (Exception e){
            return 400;
        }
        finally {
            factory.close();
        }

        return 200;
    }

    @PatchMapping("/user/updateUserType")
    public int updateUserType(@RequestParam(value = "user_type",defaultValue = "0") String user_type, @RequestParam (value = "current_user_id",defaultValue = "")String current_user_id){
        if(current_user_id.equals("")){
            return 400;
        }
        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            session.createQuery(String.format("update User u SET u.user_type = '%s' WHERE u.id = '%s'",user_type,current_user_id)).executeUpdate();
            session.getTransaction().commit();

        }
        catch (Exception e){
            factory.close();
            return 400;
        }
        finally {
            factory.close();
        }
        return 200;
    }




}
