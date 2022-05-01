package Placeholder.backend.DAO;

import Placeholder.backend.Model.PostTag;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import java.util.List;

public class PostTagDAO {

    public static SessionFactory createFactory(){
        return new Configuration().
                configure("hibernate.cfg.xml").
                addAnnotatedClass(PostTag.class).
                buildSessionFactory();
    }

    public static int addTag(PostTag postTag){
        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            session.save(postTag);
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

    public static int addMultipleTags(List<PostTag> postTags){
        SessionFactory factory = createFactory();

        try{
            for(PostTag postTag : postTags){
                Session session = factory.getCurrentSession();
                session.beginTransaction();
                session.save(postTag);
                session.getTransaction().commit();
            }
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

    public static List<PostTag> getAllTags(){
        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        List<PostTag> allTags;
        try{
            session.beginTransaction();
            allTags = session.createQuery("from PostTag pt").getResultList();
            session.getTransaction().commit();
        }
        catch (Exception e){
            System.out.println(e);
            return null;
        }
        finally {
            factory.close();
        }

        return allTags;
    }
    public static List<PostTag> getTags(String post_id){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        List<PostTag> allTags;
        try{
            session.beginTransaction();
            allTags = session.createQuery(String.format("from PostTag pt WHERE pt.post_id = '%s'",post_id)).getResultList();
            session.getTransaction().commit();
        }
        catch (Exception e){
            System.out.println(e);
            return null;
        }
        finally {
            factory.close();
        }

        return allTags;


    }

    public static int deleteTag(String id){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            session.createQuery("delete from PostTag pt where pt.id = "+id).executeUpdate();
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

    public static int deleteAllTagsFromPost(String id){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            session.createQuery("delete from PostTag pt where pt.post_id = "+id).executeUpdate();
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
