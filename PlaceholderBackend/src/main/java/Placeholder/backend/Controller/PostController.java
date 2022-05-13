package Placeholder.backend.Controller;

import Placeholder.backend.DAO.PostDAO;
import Placeholder.backend.DAO.PostTagDAO;
import Placeholder.backend.Model.*;
import Placeholder.backend.Util.DAOFunctions;
import com.google.gson.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class PostController {

    @GetMapping("/post/getPost")
    public Object getPost(@RequestParam(value = "post_id",defaultValue = "") String post_id){

        System.out.println("\n****************\n"+"getPost"+"\n****************\n");


        Object post = PostDAO.getPost(post_id);
        if(post != null){
            return DAOFunctions.getResponse(200,"post",post);
        }
        else{
            return DAOFunctions.getResponse(400,"",null);
        }
    }

    @GetMapping("/post/getAllPosts")
    public Object getAllPosts(){

        System.out.println("\n****************\n"+"getAllPosts"+"\n****************\n");


        List<Object> allPost = PostDAO.getAllPosts();
        if(allPost != null){
            return DAOFunctions.getResponse(200,"allPosts",allPost);
        }
        else{
            return DAOFunctions.getResponse(400,"",null);
        }
    }

    @GetMapping("/post/getAllPostsOfAUser")
    public Object getAllPostsOfAUser(@RequestParam(value = "user_id",defaultValue = "") String user_id){

        System.out.println("\n****************\n"+"getAllPostsOfAUser"+"\n****************\n");


        if(user_id.equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        List<Object> res = PostDAO.getAllPostsOfAUser(user_id);
        if(res != null){
            return DAOFunctions.getResponse(200,"allPosts",res);
        }
        else{
            return DAOFunctions.getResponse(400,"",null);
        }
    }


    @PostMapping("/post/addPost")
    public Object createPost(@RequestBody HashMap<String,Object> body){

        System.out.println("\n****************\n"+"addPost"+"\n****************\n");


        try{
            Gson gson = new Gson();
            String postJsonStr = gson.toJson(body.get("post"));
            String tagsJsonStr = gson.toJson(body.get("tags"));

            Post post = gson.fromJson(postJsonStr,Post.class);
            if(post.getUser_id() == 0 || post.getPost_body() == null || post.getPost_body().equals("") || post.getPost_share_date() == null || post.getPost_share_date().equals("")){
                return DAOFunctions.getResponse(400,"error","Missing Fields");
            }
            post = PostDAO.createPost(post);

            if(post == null){
                return DAOFunctions.getResponse(400,"error","Couldn't find the added post");
            }

            JsonParser jsonParser = new JsonParser();
            JsonArray jsonArray = (JsonArray) jsonParser.parse(tagsJsonStr);
            if(jsonArray.size() == 0){
                return DAOFunctions.getResponse(400,"error","Tag list empty");
            }
            ArrayList<PostTag> tagIds = new ArrayList<>();
            for(JsonElement tag: jsonArray) {
                String tagId = gson.fromJson(tag, String.class);
                PostTag postTag = new PostTag();
                postTag.setPost_id(post.getId());
                postTag.setTag_id(Integer.parseInt(tagId));
                tagIds.add(postTag);
            }
            int addTagResult = PostTagDAO.addMultipleTags(tagIds);

            if(addTagResult == 200){
                return DAOFunctions.getResponse(200,"post",post);
            }
            else{
                return DAOFunctions.getResponse(400,"error","Internal Error");
            }
        }
        catch (Exception e){
            return DAOFunctions.getResponse(400,"error",e);

        }
    }

    @PatchMapping("/post/updatePost")
    public Object updatePost(@RequestBody HashMap<String,Object> body){

        System.out.println("\n****************\n"+"updatePost"+"\n****************\n");


        try {
            Gson gson = new Gson();
            String postJsonStr = gson.toJson(body.get("post"));
            String tagsJsonStr = gson.toJson(body.get("tags"));

            Post post = gson.fromJson(postJsonStr, Post.class);
            if (post.getId() == 0 ||  post.getPost_body() == null || post.getPost_body().equals("")) {
                return DAOFunctions.getResponse(400, "error", "Missing Fields");
            }

            JsonParser jsonParser = new JsonParser();
            JsonArray jsonArray = (JsonArray) jsonParser.parse(tagsJsonStr);
            if (jsonArray.size() == 0) {
                return DAOFunctions.getResponse(400, "error", "Tag list empty");
            }
            ArrayList<PostTag> tagIds = new ArrayList<>();
            for (JsonElement tag : jsonArray) {
                String tagId = gson.fromJson(tag, String.class);
                PostTag postTag = new PostTag();
                postTag.setPost_id(post.getId());
                postTag.setTag_id(Integer.parseInt(tagId));
                tagIds.add(postTag);
            }
            return DAOFunctions.getResponse(PostDAO.updatePost(post,tagIds),"",null);
        }
        catch (Exception e){
            return DAOFunctions.getResponse(400,"error",e);

        }

    }

    @DeleteMapping("/post/deletePost")
    public Object deletePost(@RequestBody HashMap<String, String> body){

        System.out.println("\n****************\n"+"deletePost"+"\n****************\n");


        if(!body.containsKey("id") || body.get("id").equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(PostDAO.deletePost(body.get("id")),"",null);
    }

    @GetMapping("/post/getMainFeed")
    public Object getMainFeed(@RequestParam(value = "user_id",defaultValue = "") String user_id, @RequestParam(value = "tags",defaultValue = "") String tagsString){

        System.out.println("\n****************\n"+"getMainFeed"+"\n****************\n");


        if(user_id.equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        String[] tagArray = tagsString.split(",");
        HashSet<String> tagSet = new HashSet<>(Arrays.asList(tagArray));
        List<Object> allPost = null;
        if(tagsString.equals("")){
            allPost = PostDAO.getMainFeed(user_id, null);
        }
        else{
            allPost = PostDAO.getMainFeed(user_id,tagSet);
        }
        if(allPost != null){
            return DAOFunctions.getResponse(200,"allPosts",allPost);
        }
        else{
            return DAOFunctions.getResponse(400,"",null);
        }
    }

    @PostMapping("/post/likePost")
    public Object likePost(@RequestBody Like like){

        System.out.println("\n****************\n"+"likePost"+"\n****************\n");


        if(like.getPost_id() == 0 || like.getuser_id() == 0){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(PostDAO.likePost(like),"",null);

    }

    @DeleteMapping("/post/removeLike")
    public Object removeLike(@RequestBody Like like){

        System.out.println("\n****************\n"+"removeLike"+"\n****************\n");


        if(like.getPost_id() == 0 || like.getuser_id() == 0){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(PostDAO.removeLike(like),"",null);
    }

    @GetMapping("/post/getAllLikes")
    public Object getAllLikes(){

        System.out.println("\n****************\n"+"getAllLikes"+"\n****************\n");


        List<Like> allLikes = PostDAO.getAllLikes();

        if(allLikes != null){
            return DAOFunctions.getResponse(200,"allLikes",allLikes);

        }
        else{
            return DAOFunctions.getResponse(400,"",null);
        }

    }

    @PostMapping("/post/addComment")
    public Object addComment(@RequestBody Comment comment){

        System.out.println("\n****************\n"+"addComment"+"\n****************\n");


        if(comment.getPost_id() == 0 || comment.getUser_id() == 0 || comment.getBody()== null ||comment.getBody().equals("") || comment.getShare_date() == null || comment.getShare_date().equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(PostDAO.addComment(comment),"",null);

    }

    @DeleteMapping("/post/deleteComment")
    public Object deleteComment(@RequestBody HashMap<String, String> body){

        System.out.println("\n****************\n"+"deleteComment"+"\n****************\n");


        if(!body.containsKey("id") || body.get("id").equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(PostDAO.deleteComment(Integer.parseInt(body.get("id"))),"",null);
    }

    @GetMapping("/post/getAllComments")
    public Object getAllComments(){

        System.out.println("\n****************\n"+"getAllComments"+"\n****************\n");


        List<Comment> allComments = PostDAO.getAllComments();

        if(allComments != null){
            return DAOFunctions.getResponse(200,"allComments",allComments);

        }
        else{
            return DAOFunctions.getResponse(400,"",null);
        }

    }

    @PatchMapping("/post/updateComment")
    public Object updatePost(@RequestBody Comment comment){

        System.out.println("\n****************\n"+"updateComment"+"\n****************\n");


        if(comment.getBody() == null || comment.getBody().equals("") || comment.getId() == 0){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(PostDAO.updateComment(comment),"",null);
    }

}
