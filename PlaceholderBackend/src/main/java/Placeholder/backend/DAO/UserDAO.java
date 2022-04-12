package Placeholder.backend.DAO;

import Placeholder.backend.Model.Connection;
import Placeholder.backend.Model.User;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;


import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

public class UserDAO {

    public static SessionFactory createFactory(){
        return new Configuration().
                configure("hibernate.cfg.xml").
                addAnnotatedClass(User.class).addAnnotatedClass(Connection.class).
                buildSessionFactory();
    }

    public static User createUser(User user){
        user.setUser_password(Integer.toString(user.getUser_password().hashCode()));

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
                return null;
            }
            users= session.createQuery(String.format("from User u WHERE u.cs_mail = '%s'",user.getCs_mail())).getResultList();
            System.out.println(users+"!!!!!!!!!!!!!!!!!!!!");
            if(users.size() != 1){
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

    public static User getUser(String current_user_id ,String requested_id){

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

            user.setIs_connected(ConnectionDAO.checkConnection(current_user_id,requested_id));

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
        catch (Exception e){
            System.out.println(e);
            return null;
        }
        finally {
            factory.close();
        }

        return allUsers;
    }

    public static int deleteUser(String current_user_id){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            session.createQuery("delete from User s where s.id = "+current_user_id).executeUpdate();
            session.getTransaction().commit();
            ConnectionDAO.removeAllConnections(current_user_id);
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

    public static List<User> searchUser(String current_user_id, String query){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        List<User> allUsers = new ArrayList<>();
        List<Object> queryResult = null;
        try{
            HashSet<Integer> found = new HashSet<>();
            Gson gson = new Gson();
            session.beginTransaction();
            queryResult = session.createQuery(String.format("from User u INNER JOIN Connection c ON user1_id = '%s' and user2_id = u.id WHERE u.full_name LIKE '%s'",current_user_id,(query+"%"))).getResultList();
            for(Object o : queryResult){
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
            for(Object o : rawResult){
                Gson gson = new Gson();
                String jsonStr = gson.toJson(o);
                JsonParser jsonParser = new JsonParser();
                JsonArray jsonArray = (JsonArray) jsonParser.parse(jsonStr);
                User u = gson.fromJson(jsonArray.get(0), User.class);
                u.setIs_connected(true);
                result.add(u);
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
        return result;

    }


}
