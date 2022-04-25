package Placeholder.backend.Controller;

import Placeholder.backend.DAO.PostDAO;
import Placeholder.backend.DAO.PostTagDAO;
import Placeholder.backend.Model.Post;
import Placeholder.backend.Model.PostTag;
import Placeholder.backend.Util.DAOFunctions;
import com.google.gson.*;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
public class PostController {

    @GetMapping("/post/getAllPosts")
    public Object getAllPosts(){
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
        Gson gson = new Gson();
        String postJsonStr = gson.toJson(body.get("post"));
        String tagsJsonStr = gson.toJson(body.get("tags"));

        Post post = gson.fromJson(postJsonStr,Post.class);
        if(post.getUser_id() == 0 || post.getPost_body() == null || post.getPost_body().equals("") || post.getPost_share_date() == null || post.getPost_share_date().equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        post = PostDAO.createPost(post);

        if(post == null){
            return DAOFunctions.getResponse(400,"",null);
        }

        JsonParser jsonParser = new JsonParser();
        JsonArray jsonArray = (JsonArray) jsonParser.parse(tagsJsonStr);
        if(jsonArray.size() == 0){
            return DAOFunctions.getResponse(400,"",null);
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
            return DAOFunctions.getResponse(400,"",null);
        }
    }

    @PatchMapping("/post/updatePost")
    public Object updatePost(@RequestBody Post post){
        if(post.getPost_body() == null || post.getPost_body().equals("") || post.getId() == 0){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(PostDAO.updatePost(post),"",null);
    }

    @DeleteMapping("/post/deletePost")
    public Object deletePost(@RequestBody HashMap<String, String> body){
        if(!body.containsKey("id") || body.get("id").equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(PostDAO.deletePost(body.get("id")),"",null);
    }

    @GetMapping("/post/getMainFeed")
    public Object getMainFeed(@RequestParam(value = "user_id",defaultValue = "") String user_id){
        if(user_id.equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        List<Object> allPost = PostDAO.getMainFeed(user_id);
        if(allPost != null){
            return DAOFunctions.getResponse(200,"allPosts",allPost);
        }
        else{
            return DAOFunctions.getResponse(400,"",null);
        }
    }

}
