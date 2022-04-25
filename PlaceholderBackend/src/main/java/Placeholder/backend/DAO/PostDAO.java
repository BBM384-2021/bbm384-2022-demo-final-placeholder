package Placeholder.backend.DAO;

import Placeholder.backend.Model.*;
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

public class PostDAO {


    public static SessionFactory createFactory(){
        return new Configuration().
                configure("hibernate.cfg.xml").
                addAnnotatedClass(Post.class).addAnnotatedClass(PostTag.class).addAnnotatedClass(Tag.class).addAnnotatedClass(Connection.class).addAnnotatedClass(User.class).
                buildSessionFactory();
    }


    private static void extractPostList( List<Object> result, List<Object> queryResult, boolean isMainFeed) {
        Gson gson = new Gson();
        if(queryResult.size() != 0){
            HashSet<Integer> postIdSet = new HashSet<>();
            ArrayList<Tag> currentTags = new ArrayList<>();
            Post currentPost = null;
            User currentUser = null;
            JsonParser jsonParser = new JsonParser();
            for(Object o : queryResult){
                String jsonStr = gson.toJson(o);
                JsonArray jsonArray = (JsonArray) jsonParser.parse(jsonStr);
                currentPost = gson.fromJson(jsonArray.get(2), Post.class);
                Tag t = gson.fromJson(jsonArray.get(0), Tag.class);
                if(isMainFeed){
                    currentUser =  gson.fromJson(jsonArray.get(4), User.class);
                }

                if(!postIdSet.contains(currentPost.getId())){
                    if(postIdSet.size() != 0){
                        HashMap<String,Object> currentPostWithTags = new HashMap<>();
                        currentPostWithTags.put("post",currentPost);
                        currentPostWithTags.put("tags", currentTags);
                        if(isMainFeed){
                            currentPostWithTags.put("user",currentUser);
                        }
                        result.add(currentPostWithTags);
                    }
                    postIdSet.add(currentPost.getId());
                    currentTags = new ArrayList<>();

                }
                currentTags.add(t);
            }
            HashMap<String,Object> currentPostWithTags = new HashMap<>();
            currentPostWithTags.put("post",currentPost);
            currentPostWithTags.put("tags", currentTags);
            if(isMainFeed){
                currentPostWithTags.put("user",currentUser);
            }
            result.add(currentPostWithTags);
        }
    }

    public static List<Object> getAllPostsOfAUser(String user_id){
        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        List<Object> result = new ArrayList<>();
        List<Object> queryResult;
        try{
            session.beginTransaction();
            queryResult = session.createQuery(String.format("from Tag t INNER JOIN PostTag pt ON t.id = pt.tag_id INNER JOIN Post p ON p.id = pt.post_id WHERE p.user_id = '%s'",user_id)).getResultList();
            extractPostList(result, queryResult,false);
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

    public static List<Object> getAllPosts(){
        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        List<Object> result = new ArrayList<>();
        List<Object> queryResult;
        try{
            session.beginTransaction();
            queryResult = session.createQuery(String.format("from Tag t INNER JOIN PostTag pt ON t.id = pt.tag_id INNER JOIN Post p ON p.id = pt.post_id")).getResultList();
            extractPostList(result, queryResult,false);
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


    public static Post createPost(Post post){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();
        List<Post> posts;
        try{
            session.beginTransaction();
            session.save(post);
            posts = session.createQuery(String.format("from Post p WHERE p.post_body = '%s'",post.getPost_body())).getResultList();
            if(posts.size() == 0){
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
        return posts.get(0);
    }


    public static int updatePost(Post post){
        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            session.createQuery(String.format("update Post p SET p.post_body = '%s' , p.post_visual_data_path = '%s' WHERE p.id = '%s'",post.getPost_body(),post.getPost_visual_data_path(),post.getId())).executeUpdate();
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


    public static int deletePost(String id){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();
        try{
            session.beginTransaction();
            session.createQuery("delete from Post p where p.id = "+id).executeUpdate();
            session.getTransaction().commit();
            PostTagDAO.deleteAllTagsFromPost(id);
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

    public static List<Object> getMainFeed(String user_id){
        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        List<Object> result = new ArrayList<>();
        List<Object> queryResult;
        try{
            session.beginTransaction();
            queryResult = session.createQuery(String.format("from Tag t INNER JOIN PostTag pt ON t.id = pt.tag_id INNER JOIN Post p ON p.id = pt.post_id INNER JOIN Connection c ON (c.user1_id = p.user_id and c.user2_id = '%s') INNER JOIN User u ON u.id = p.user_id",user_id)).getResultList();
            extractPostList(result, queryResult,true);
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
