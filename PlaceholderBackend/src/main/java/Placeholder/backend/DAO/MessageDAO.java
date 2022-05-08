package Placeholder.backend.DAO;

import Placeholder.backend.Model.Message;
import Placeholder.backend.Model.User;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import java.util.*;

public class MessageDAO {


    private static void extractMessageList(HashMap<String,HashMap<String,List<Object>>> result, List<Object> queryResult, String currentUserId) {
        Gson gson = new Gson();
        if (queryResult.size() != 0) {
            JsonParser jsonParser = new JsonParser();
            for(Object o : queryResult) {
                String jsonStr = gson.toJson(o);
                JsonArray jsonArray = (JsonArray) jsonParser.parse(jsonStr);

                Message message =  gson.fromJson(jsonArray.get(0), Message.class);
                User sender = gson.fromJson(jsonArray.get(1), User.class);
                User receiver = gson.fromJson(jsonArray.get(2), User.class);

                if(result.containsKey(Integer.toString(receiver.getId()))){
                    result.get(Integer.toString(receiver.getId())).get("messages").add(message);
                }
                else if(result.containsKey(Integer.toString(sender.getId()))){
                    result.get(Integer.toString(sender.getId())).get("messages").add(message);
                }
                else{
                    HashMap<String,List<Object>> chatLog = new HashMap<>();
                    List<Object> messages = new ArrayList<>();
                    List<Object> userList = new ArrayList<>();

                    int otherUsersId;

                    if(sender.getId() == Integer.parseInt(currentUserId)){
                        userList.add(receiver);
                        otherUsersId = receiver.getId();
                    }
                    else{
                        userList.add(sender);
                        otherUsersId = sender.getId();
                    }
                    messages.add(message);
                    chatLog.put("messages",messages);
                    chatLog.put("user",userList);
                    result.put(Integer.toString(otherUsersId),chatLog);
                }
            }
        }
    }

    public static SessionFactory createFactory(){
        return new Configuration().
                configure("hibernate.cfg.xml").
                addAnnotatedClass(Message.class).addAnnotatedClass(User.class).
                buildSessionFactory();
    }


    public static int send(Message message){
        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();
        try{
            session.beginTransaction();
            session.save(message);
            session.getTransaction().commit();
        }
        catch (Exception e){
            factory.close();
            System.out.println(e);
            return 400;
        }
        finally {
            factory.close();
        }
        return 200;
    }

    public static Object getAllMessagesOfAUser(String user_id){
        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        HashMap<String,HashMap<String,List<Object>>> result = new HashMap<>();
        List<Object> queryResult;
        try{
            session.beginTransaction();
            queryResult = session.createQuery(String.format("from Message m " +
                    "INNER JOIN User u1 ON m.sender_id = u1.id " +
                    "INNER JOIN User u2 ON m.receiver_id = u2.id " +
                    "WHERE m.sender_id = '%s' or m.receiver_id = '%s'",user_id,user_id)).getResultList();
            extractMessageList(result, queryResult,user_id);
            session.getTransaction().commit();

        }
        catch (Exception e){
            System.out.println(e);
            return null;
        }
        finally {
            factory.close();
        }
        if(result.size()==0){
            return null;
        }
        return result;
    }


    public static Object getMessageLogForAUser(String current_user_id, String other_user_id){
        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        HashMap<String,HashMap<String,List<Object>>> result = new HashMap<>();
        List<Object> queryResult;
        try{
            session.beginTransaction();
            queryResult = session.createQuery(String.format("from Message m " +
                    "INNER JOIN User u1 ON m.sender_id = u1.id " +
                    "INNER JOIN User u2 ON m.receiver_id = u2.id " +
                    "WHERE (m.sender_id = '%s' and m.receiver_id = '%s') or (m.sender_id = '%s' and m.receiver_id = '%s')",current_user_id,other_user_id,other_user_id,current_user_id)).getResultList();
            extractMessageList(result, queryResult,current_user_id);
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

    public static int updateMessage(Message message){
        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            session.createQuery(String.format("update Message m SET m.body = '%s' WHERE m.id = '%s'",message.getBody(),message.getId())).executeUpdate();
            session.getTransaction().commit();
        }
        catch (Exception e){
            factory.close();
            System.out.println(e);
            return 400;
        }
        finally {
            factory.close();
        }

        return 200;

    }

    public static int deleteMessage(String id){
        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();
        try{
            session.beginTransaction();
            session.createQuery("delete from Message m where m.id = "+id).executeUpdate();
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


}
