package Placeholder.backend.DAO;

import Placeholder.backend.Model.Connection;
import Placeholder.backend.Model.ConnectionRequest;
import Placeholder.backend.Model.User;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

public class UserDAO {

    private static void extractUserList(List<User> result, List<Object> rawResult) {
        JsonParser jsonParser = new JsonParser();
        for(Object o : rawResult){
            Gson gson = new Gson();
            String jsonStr = gson.toJson(o);
            JsonArray jsonArray = (JsonArray) jsonParser.parse(jsonStr);
            User u = gson.fromJson(jsonArray.get(0), User.class);
            result.add(u);
        }
    }

    public static SessionFactory createFactory(){
        return new Configuration().
                configure("hibernate.cfg.xml").
                addAnnotatedClass(User.class).addAnnotatedClass(Connection.class).addAnnotatedClass(ConnectionRequest.class).
                buildSessionFactory();
    }

    public static User createUser(User user){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();
        List<User> users;
        try{
            session.beginTransaction();
            users= session.createQuery(String.format("from User u WHERE u.cs_mail = '%s'",user.getCs_mail())).getResultList();
            if(users.size() == 0){
                session.save(user);
            }
            else{
                session.getTransaction().commit();
                return null;
            }
            users= session.createQuery(String.format("from User u WHERE u.cs_mail = '%s'",user.getCs_mail())).getResultList();
            if(users.size() != 1){
                session.getTransaction().commit();
                return null;
            }
            session.getTransaction().commit();
        }
        catch (Exception e){
            System.out.println(e);
            return null;
        }
        finally {
            factory.close();
        }
        return users.get(0);
    }

    public static User login(String cs_mail, String user_password){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        User user;
        String hashedPassword = Integer.toString(user_password.hashCode());

        try{
            session.beginTransaction();
            List<User> users= session.createQuery(String.format("from User u WHERE u.cs_mail = '%s' and u.user_password = '%s'",cs_mail,hashedPassword)).getResultList();
            if(users.size() == 0){
                System.out.println("wsejugddşklfhgşjdf");
                return null;
            }
            user = users.get(0);
            session.getTransaction().commit();

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

    public static User getUser(String requested_id){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        User user;

        try{
            session.beginTransaction();
            List<User> users= session.createQuery("from User u WHERE u.id = "+requested_id).getResultList();
            if(users.size() == 0){
                return null;
            }
            user = users.get(0);
            session.getTransaction().commit();
            user.setUser_password("");
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

    public static List<User> getAllUsers(){
        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();


        List<User> allUsers;
        try{
            session.beginTransaction();
            allUsers = session.createQuery("from User u").getResultList();
            session.getTransaction().commit();
            for(User u : allUsers){
                u.setUser_password("");
            }
        }
        catch (Exception e){
            System.out.println(e);
            return null;
        }
        finally {
            factory.close();
        }

        return allUsers;
    }

    public static int deleteUser(String user_id){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            session.createQuery("delete from User s where s.id = "+user_id).executeUpdate();
            session.getTransaction().commit();
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

    public static int updateUser(User user){

        SessionFactory factory = createFactory();

        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            session.createQuery(String.format("update User u SET u.full_name = '%s' , u.user_type = '%s' ,  u.cs_mail = '%s' , u.phone = '%s' , u.company = '%s' , u.link = '%s' , u.alt_mail = '%s' , u.profile_pic_path = '%s'  WHERE u.id = '%s' "
                    ,user.getFull_name(),user.getUser_type(),user.getCs_mail(),user.getPhone(),user.getCompany(),user.getLink(),user.getAlt_mail(),user.getProfile_pic_path(),user.getId())).executeUpdate();
            session.getTransaction().commit();

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

    public static List<List<User>> searchUser(String current_user_id, String query){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        List<List<User>> allUsers = new ArrayList<>();
        List<User> connectedUsers = new ArrayList<>();
        List<User> nonConnectedUsers = new ArrayList<>();
        List<Object> queryResult = null;
        try{
            HashSet<Integer> found = new HashSet<>();
            Gson gson = new Gson();
            session.beginTransaction();
            queryResult = session.createQuery(String.format("from User u INNER JOIN Connection c ON user1_id = '%s' and user2_id = u.id WHERE u.full_name LIKE '%s'",current_user_id,(query+"%"))).getResultList();
            for(Object o : queryResult){
                String jsonStr = ((Object[]) o)[0].toString();
                User u = gson.fromJson(jsonStr.substring(4), User.class);
                connectedUsers.add(u);
                found.add(u.getId());
            }
            queryResult = session.createQuery(String.format("from User u WHERE u.full_name LIKE '%s'",(query+"%"))).getResultList();
            for(Object o : queryResult){
                String jsonStr = o.toString();
                User u = gson.fromJson(jsonStr.substring(4), User.class);
                if(!found.contains(u.getId())){
                    nonConnectedUsers.add(u);
                }
            }
            session.getTransaction().commit();
            allUsers.add(connectedUsers);
            allUsers.add(nonConnectedUsers);
        }
        catch (Exception e){
            System.out.println(e);
            return null;
        }
        finally {
            factory.close();
        }

        return allUsers;

    }

    public static int updatePassword(String cs_mail, String old_password, String new_password){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        User user;
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
            System.out.println(e);
            return 400;
        }
        finally {
            factory.close();
        }

        return 200;
    }

    public static int updateUserType(String user_type, String current_user_id){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            session.createQuery(String.format("update User u SET u.user_type = '%s' WHERE u.id = '%s'",user_type,current_user_id)).executeUpdate();
            session.getTransaction().commit();

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

    public static List<User> getUsersConnected(String current_user_id){

        List<User> result = new ArrayList<>();

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();
        try {
            session.beginTransaction();
            List<Object> rawResult = session.createQuery(String.format("from User u INNER JOIN Connection c ON c.user2_id = u.id and c.user1_id = '%s'",current_user_id)).getResultList();
            extractUserList(result, rawResult);
            session.getTransaction().commit();
        }
        catch (Exception e){
            System.out.println(e);
            return null;
        }
        finally {
            factory.close();
        }
        return result;

    }

    public static List<User> getConnectionRequestedUsers(String current_user_id){

        List<User> result = new ArrayList<>();

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try {
            session.beginTransaction();
            List<Object> rawResult = session.createQuery(String.format("from User u INNER JOIN ConnectionRequest c ON c.receiver_id = u.id and c.sender_id = '%s'",current_user_id)).getResultList();
            extractUserList(result, rawResult);
            session.getTransaction().commit();

        }
        catch (Exception e){
            System.out.println(e);
            return null;
        }
        finally {
            factory.close();
        }
        return result;


    }

    public static List<User> getConnectionReceivedUsers(String current_user_id){

        List<User> result = new ArrayList<>();

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try {
            session.beginTransaction();
            List<Object> rawResult = session.createQuery(String.format("from User u INNER JOIN ConnectionRequest c ON c.sender_id = u.id and c.receiver_id = '%s'",current_user_id)).getResultList();
            extractUserList(result, rawResult);
            session.getTransaction().commit();

        }
        catch (Exception e){
            System.out.println(e);
            return null;
        }
        finally {
            factory.close();
        }
        return result;


    }

    public static HashMap<String,Object> getProfileData(String current_user_id, String  requested_id){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        HashMap<String,Object> result = new HashMap<>();
        List<Object> queryResult = null;
        List<User> connectedList = new ArrayList<>();
        try{
            session.beginTransaction();
            queryResult= session.createQuery(String.format("from Connection c INNER JOIN User u1 on c.user1_id = u1.id INNER JOIN User u2 on c.user2_id = u2.id WHERE c.user2_id = '%s'",requested_id)).getResultList();
            if(queryResult.size() != 0){
                JsonParser jsonParser = new JsonParser();
                User currentUser = null;
                for(Object o : queryResult){
                    Gson gson = new Gson();
                    String jsonStr = gson.toJson(o);
                    JsonArray jsonArray = (JsonArray) jsonParser.parse(jsonStr);
                    User u = gson.fromJson(jsonArray.get(1), User.class);
                    connectedList.add(u);
                    if(Integer.toString(u.getId()).equals(current_user_id)){
                        result.put("connected",true);
                    }
                    if(currentUser == null){
                        currentUser = gson.fromJson(jsonArray.get(2), User.class);
                    }
                }
                result.put("connectedUsers",connectedList);
                result.put("user",currentUser);
                session.getTransaction().commit();
            }
            else{
                result.put("user",getUser(requested_id));
            }

            if(!result.containsKey("connected") && !current_user_id.equals(requested_id)){
                result.put("connected",false);
            }
        }
        catch (Exception e){
            System.out.println(e);
            return null;
        }
        finally {
            factory.close();
        }
        return result;
    }


}
