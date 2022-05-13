package Placeholder.backend.Controller;

import Placeholder.backend.DAO.PostTagDAO;
import Placeholder.backend.Model.PostTag;
import Placeholder.backend.Util.DAOFunctions;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
public class PostTagController {

    @GetMapping("postTag/getAllPostTags")
    public Object getAllPostTags(){

        System.out.println("\n****************\n"+"getAllPostTags"+"\n****************\n");


        List<PostTag> allTags = PostTagDAO.getAllTags();
        if(allTags != null){
            return DAOFunctions.getResponse(200,"allPostTags",allTags);
        }
        else{
            return DAOFunctions.getResponse(400,"",null);
        }

    }
    @GetMapping("postTag/getTags")
    public Object getTags(@RequestParam(value = "post_id",defaultValue = "") String post_id){

        System.out.println("\n****************\n"+"getTags"+"\n****************\n");


        if(post_id.equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }

        List<PostTag> allTags = PostTagDAO.getTags(post_id);
        if(allTags != null){
            return DAOFunctions.getResponse(200,"tags",allTags);
        }
        else{
            return DAOFunctions.getResponse(400,"",null);
        }

    }

    @PostMapping("/postTag/addTag")
    public Object createPostTag(@RequestBody PostTag postTag){

        System.out.println("\n****************\n"+"addTag"+"\n****************\n");


        if(postTag.getPost_id() == 0 || postTag.getTag_id() == 0){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(PostTagDAO.addTag(postTag),"",null);
    }


    @DeleteMapping("/postTag/removeTag")
    public Object deletePostTag(@RequestBody HashMap<String, String> body){

        System.out.println("\n****************\n"+"removeTag"+"\n****************\n");


        if(!body.containsKey("id") || body.get("id").equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(PostTagDAO.deleteTag(body.get("id")),"",null);
    }
}
