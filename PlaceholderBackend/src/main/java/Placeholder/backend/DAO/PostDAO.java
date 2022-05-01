package Placeholder.backend.DAO;

import Placeholder.backend.Model.*;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import java.util.*;

public class PostDAO {


    public static SessionFactory createFactory(){
        return new Configuration().
                configure("hibernate.cfg.xml").
                addAnnotatedClass(Post.class).
                addAnnotatedClass(PostTag.class).
                addAnnotatedClass(Tag.class).
                addAnnotatedClass(Connection.class).
                addAnnotatedClass(User.class).addAnnotatedClass(Like.class).
                addAnnotatedClass(Comment.class).
                buildSessionFactory();
    }


    private static void extractPostList( List<Object> result, List<Object> queryResult, boolean isMainFeed, HashSet<String> filter) {
        Gson gson = new Gson();
        if(queryResult.size() != 0){
            HashSet<Integer> postIdSet = new HashSet<>();

            HashSet<Integer> tagIdSet = new HashSet<>();
            HashSet<Integer> likeIdSet = new HashSet<>();
            HashSet<Integer> commentIdSet = new HashSet<>();

            ArrayList<Tag> currentTags = new ArrayList<>();
            ArrayList<HashMap<String,Object>> currentLikes = new ArrayList<>();
            ArrayList<HashMap<String,Object>> currentComments = new ArrayList<>();

            Post prevPost = null;
            User prevUser = null;

            JsonParser jsonParser = new JsonParser();
            for(Object o : queryResult){
                String jsonStr = gson.toJson(o);
                JsonArray jsonArray = (JsonArray) jsonParser.parse(jsonStr);

                Post currentPost = gson.fromJson(jsonArray.get(2), Post.class);

                if(!postIdSet.contains(currentPost.getId())){
                    if(postIdSet.size() != 0){
                        boolean found = true;
                        if(filter != null){
                            found = false;
                            for(Tag t:currentTags){
                                if(filter.contains(Integer.toString(t.getId()))){
                                    found = true;
                                    break;
                                }
                            }
                        }
                        if(found){
                            HashMap<String,Object> currentPostWithData = new HashMap<>();
                            currentPostWithData.put("post",prevPost);
                            currentPostWithData.put("tags", currentTags);
                            currentPostWithData.put("user",prevUser);
                            currentPostWithData.put("likes",currentLikes);
                            currentPostWithData.put("comments",currentComments);
                            result.add(currentPostWithData);
                        }
                    }
                    postIdSet.add(currentPost.getId());
                    currentTags = new ArrayList<>();
                    currentLikes = new ArrayList<>();
                    currentComments = new ArrayList<>();
                    likeIdSet = new HashSet<>();
                    tagIdSet = new HashSet<>();
                    commentIdSet = new HashSet<>();
                }
                int indexAddition = 0;
                if(isMainFeed){
                    indexAddition = 1;
                }

                Comment comment = null;
                User commentedUser = null;

                try{
                    comment = gson.fromJson(jsonArray.get(6+indexAddition),Comment.class);
                    commentedUser = gson.fromJson(jsonArray.get(7+indexAddition),User.class);
                }
                catch (Exception e){

                }

                if(comment != null && !commentIdSet.contains(comment.getId())){
                    commentIdSet.add(comment.getId());
                    HashMap<String,Object> commentBody = new HashMap<>();
                    commentBody.put("user",commentedUser);
                    commentBody.put("comment",comment);
                    currentComments.add(commentBody);
                }

                Like like = null;
                User likedUser = null;

                try{
                    like = gson.fromJson(jsonArray.get(4+indexAddition),Like.class);
                    likedUser = gson.fromJson(jsonArray.get(5+indexAddition),User.class);
                }
                catch (Exception e){

                }
                if(like != null && !likeIdSet.contains(like.getId())){
                    likeIdSet.add(like.getId());
                    HashMap<String,Object> likeBody = new HashMap<>();
                    likeBody.put("user",likedUser);
                    likeBody.put("like",like);
                    currentLikes.add(likeBody);
                }

                Tag t = gson.fromJson(jsonArray.get(0), Tag.class);
                if(!tagIdSet.contains(t.getId())){
                    currentTags.add(t);
                    tagIdSet.add(t.getId());
                }

                User currentUser =  gson.fromJson(jsonArray.get(3+indexAddition), User.class);
                prevPost = currentPost;
                prevUser = currentUser;
            }
            boolean found = true;
            if(filter != null){
                found = false;
                for(Tag t:currentTags){
                    if(filter.contains(Integer.toString(t.getId()))){
                        found = true;
                        break;
                    }
                }
            }
            if(found){
                HashMap<String,Object> currentPostWithData = new HashMap<>();
                currentPostWithData.put("post",prevPost);
                currentPostWithData.put("tags", currentTags);
                currentPostWithData.put("user",prevUser);
                currentPostWithData.put("likes",currentLikes);
                currentPostWithData.put("comments",currentComments);
                result.add(currentPostWithData);
            }
        }
        Collections.reverse(result);
    }

    public static List<Object> getAllPostsOfAUser(String user_id){
        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        List<Object> result = new ArrayList<>();
        List<Object> queryResult;
        try{
            session.beginTransaction();
            queryResult = session.createQuery(String.format("from Tag t " +
                    "INNER JOIN PostTag pt ON t.id = pt.tag_id " +
                    "INNER JOIN Post p ON (p.id = pt.post_id AND p.user_id = '%s') " +
                    "INNER JOIN User u ON u.id = p.user_id " +
                    "LEFT JOIN Like l ON l.post_id = p.id " +
                    "LEFT JOIN User lu ON l.user_id = lu.id " +
                    "LEFT JOIN Comment c ON c.post_id = p.id " +
                    "LEFT JOIN User cu ON c.user_id = cu.id",user_id)).getResultList();
            extractPostList(result, queryResult,false,null);
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
            queryResult = session.createQuery(String.format("from Tag t " +
                    "INNER JOIN PostTag pt ON t.id = pt.tag_id " +
                    "INNER JOIN Post p ON p.id = pt.post_id " +
                    "INNER JOIN User u ON u.id = p.user_id " +
                    "LEFT JOIN Like l ON l.post_id = p.id " +
                    "LEFT JOIN User lu ON l.user_id = lu.id " +
                    "LEFT JOIN Comment c ON c.post_id = p.id " +
                    "LEFT JOIN User cu ON c.user_id = cu.id")).getResultList();
            extractPostList(result, queryResult,false,null);
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

    public static List<Object> getMainFeed(String user_id, HashSet<String> filter){
        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        List<Object> result = new ArrayList<>();
        List<Object> queryResult;
        try{
            session.beginTransaction();
            queryResult = session.createQuery(String.format("from Tag t " +
                    "INNER JOIN PostTag pt ON t.id = pt.tag_id " +
                    "INNER JOIN Post p ON p.id = pt.post_id " +
                    "INNER JOIN Connection c ON (c.user1_id = p.user_id and c.user2_id = '%s') " +
                    "INNER JOIN User u ON u.id = p.user_id " +
                    "LEFT JOIN Like l ON l.post_id = p.id " +
                    "LEFT JOIN User lu ON l.user_id = lu.id " +
                    "LEFT JOIN Comment c ON c.post_id = p.id " +
                    "LEFT JOIN User cu ON c.user_id = cu.id",user_id)).getResultList();
            extractPostList(result, queryResult,true,filter);
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

    public static int likePost(Like like){
        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            session.save(like);
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

    public static int removeLike(Like like){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            session.createQuery(String.format("delete from Like l where l.user_id = '%s' and l.post_id = '%s'",like.getuser_id(),like.getPost_id())).executeUpdate();
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

    public static List<Like> getAllLikes(){
        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        List<Like> allLikes;
        try{
            session.beginTransaction();
            allLikes = session.createQuery("from Like l").getResultList();
            session.getTransaction().commit();
        }
        catch (Exception e){
            System.out.println(e);
            return null;
        }
        finally {
            factory.close();
        }

        return allLikes;
    }


    public static int addComment(Comment comment){
        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            session.save(comment);
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

    public static int deleteComment(int id){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            session.createQuery(String.format("delete from Comment c WHERE c.id = '%s'",id)).executeUpdate();
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

    public static List<Comment> getAllComments(){
        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        List<Comment> allComments;
        try{
            session.beginTransaction();
            allComments = session.createQuery("from Comment c").getResultList();
            session.getTransaction().commit();
        }
        catch (Exception e){
            System.out.println(e);
            return null;
        }
        finally {
            factory.close();
        }

        return allComments;
    }

    public static int updateComment(Comment comment){
        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            session.createQuery(String.format("update Comment c SET c.body = '%s' WHERE c.id = '%s'",comment.getBody(),comment.getId())).executeUpdate();
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
