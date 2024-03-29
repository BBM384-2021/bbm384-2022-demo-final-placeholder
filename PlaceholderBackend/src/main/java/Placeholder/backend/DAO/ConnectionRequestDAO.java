package Placeholder.backend.DAO;

import Placeholder.backend.Model.ConnectionRequest;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import java.util.List;

public class ConnectionRequestDAO {

    public static SessionFactory createFactory(){
        return new Configuration().
                configure("hibernate.cfg.xml").
                addAnnotatedClass(ConnectionRequest.class).
                buildSessionFactory();
    }

    public static int createRequest(ConnectionRequest connectionRequest){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            session.save(connectionRequest);
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
    public static int removeRequest(String current_user_id, String other_user_id){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            session.createQuery(String.format("delete from ConnectionRequest WHERE (sender_id = '%s' and receiver_id = '%s') or (receiver_id = '%s' and sender_id = '%s')",current_user_id,other_user_id,current_user_id,other_user_id)).executeUpdate();
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

    public static int checkRequest(String current_user_id, String checked_user_id){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            List<ConnectionRequest> connectionRequests = session.createQuery(String.format("from ConnectionRequest WHERE (sender_id = '%s' and receiver_id = '%s') or (receiver_id = '%s' and sender_id = '%s')",current_user_id,checked_user_id,current_user_id,checked_user_id)).getResultList();
            session.getTransaction().commit();
            if(connectionRequests.size() == 0){
                return 0;
            }
            else if(Integer.toString(connectionRequests.get(0).getSender_id()).equals(current_user_id)){
                return 1;
            }
            else{
                return 2;
            }
        }
        catch (Exception e){
            System.out.println(e);
            return 0;
        }
        finally {
            factory.close();
        }

    }

    public static int removeAllRequests(String user_id){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            session.createQuery(String.format("delete from ConnectionRequest c where c.sender_id = '%s' or c.receiver_id = '%s'",user_id,user_id)).executeUpdate();
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

    public static List<ConnectionRequest> getAllRequests(){
        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();


        List<ConnectionRequest> allRequests;
        try{
            session.beginTransaction();
            allRequests = session.createQuery("from ConnectionRequest c").getResultList();
            session.getTransaction().commit();
        }
        catch (Exception e){
            System.out.println(e);
            return null;
        }
        finally {
            factory.close();
        }

        return allRequests;
    }
}
