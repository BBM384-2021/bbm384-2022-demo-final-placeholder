package Placeholder.backend.DAO;

import Placeholder.backend.Model.Tag;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import java.util.List;

public class TagDAO {

    public static SessionFactory createFactory(){
        return new Configuration().
                configure("hibernate.cfg.xml").
                addAnnotatedClass(Tag.class).
                buildSessionFactory();
    }

    public static int createTag(Tag tag){
        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            session.save(tag);
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
    public static List<Tag> getAllTags(){
        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        List<Tag> allTags;
        try{
            session.beginTransaction();
            allTags = session.createQuery("from Tag t").getResultList();
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

    public static int updateTag(Tag tag){
        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            session.createQuery(String.format("update Tag t SET t.tag_name = '%s' WHERE t.id = '%s'",tag.getTag_name(),tag.getId())).executeUpdate();
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

    public static int deleteTag(String id){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            session.createQuery("delete from Tag t where t.id = "+id).executeUpdate();
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
