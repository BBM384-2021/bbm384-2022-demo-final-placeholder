package Placeholder.backend;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;


import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ConnectionController {

    public static SessionFactory createFactory(){
        return new Configuration().
                configure("hibernate.cfg.xml").
                addAnnotatedClass(Connection.class).
                buildSessionFactory();
    }

    @PostMapping("/connection/createConnection")
    public int createConnection(@RequestBody Connection connection){
        System.out.println(connection);

        if(connection.getUser1_id() == 0 || connection.getUser2_id() == 0){
            return 400;
        }
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

    @GetMapping("/connection/checkConnection")
    public static boolean checkConnection(@RequestParam(value = "user1_id",defaultValue = "") String user1_id ,@RequestParam(value = "user2_id",defaultValue = "") String user2_id){

        if(user1_id.equals("") || user2_id.equals("")){
            return false;
        }

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

    @DeleteMapping("/connection/removeConnection")
    public static int removeConnection(@RequestParam(value = "user1_id",defaultValue = "") String user1_id ,@RequestParam(value = "user2_id",defaultValue = "") String user2_id){

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

    @DeleteMapping("/connection/deleteAllConnections")
    public static int removeAllConnections(@RequestParam(value = "user_id",defaultValue = "") String user_id){

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
