package Placeholder.backend.DAO;

import Placeholder.backend.Model.Connection;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import java.util.List;

public class ConnectionDAO {

    public static SessionFactory createFactory(){
        return new Configuration().
                configure("hibernate.cfg.xml").
                addAnnotatedClass(Connection.class).
                buildSessionFactory();
    }

    public static int createConnection(Connection connection){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            /*
            if(UserController.getUser("1",Integer.toString(connection.getUser2_id())) == null){
                return 400;
            }

             */
            session.beginTransaction();
            session.save(connection);
            session.getTransaction().commit();
            session = factory.getCurrentSession();
            session.beginTransaction();
            Connection reverse = new Connection();
            reverse.setUser1_id(connection.getUser2_id());
            reverse.setUser2_id(connection.getUser1_id());
            session.save(reverse);
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

    public static boolean checkConnection(String user1_id , String user2_id){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        Connection connection= null;

        try{
            session.beginTransaction();
            List<Connection> connections = session.createQuery(String.format("from Connection c WHERE c.user1_id = '%s' and c.user2_id = '%s'",user1_id,user2_id)).getResultList();
            if(connections.size() == 0){
                return false;
            }
            connection = connections.get(0);
            session.getTransaction().commit();
            System.out.println(connection);

        }
        catch (Exception e){
            return false;
        }
        finally {
            factory.close();
        }
        return true;

    }

    public static int removeConnection(String user1_id ,String user2_id){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            session.createQuery(String.format("delete from Connection c where (c.user1_id = '%s' and c.user2_id = '%s') or (c.user2_id = '%s' and c.user1_id = '%s')",user1_id,user2_id,user1_id,user2_id)).executeUpdate();
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

    public static int removeAllConnections(String user_id){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            session.createQuery(String.format("delete from Connection c where c.user1_id = '%s' or c.user2_id = '%s'",user_id,user_id)).executeUpdate();
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
