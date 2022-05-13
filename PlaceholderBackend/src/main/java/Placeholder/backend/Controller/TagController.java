package Placeholder.backend.Controller;

import Placeholder.backend.DAO.TagDAO;
import Placeholder.backend.Model.Tag;
import Placeholder.backend.Util.DAOFunctions;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
public class TagController {

    @GetMapping("tag/getAllTags")
    public Object getAllTags(){

        System.out.println("\n****************\n"+"getAllTags"+"\n****************\n");

        List<Tag> allTags = TagDAO.getAllTags();
        if(allTags != null){
            return DAOFunctions.getResponse(200,"allTags",allTags);
        }
        else{
            return DAOFunctions.getResponse(400,"",null);
        }

    }

    @PostMapping("/tag/createTag")
    public Object createTag(@RequestBody Tag tag){

        System.out.println("\n****************\n"+"createTag"+"\n****************\n");


        if(tag.getTag_name().equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(TagDAO.createTag(tag),"",null);
    }

    @PatchMapping("/tag/updateTag")
    public Object updateTag(@RequestBody Tag tag){

        System.out.println("\n****************\n"+"updateTag"+"\n****************\n");

        if(tag.getId() == 0 || tag.getTag_name() == null || tag.getTag_name().equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(TagDAO.updateTag(tag),"",null);
    }

    @DeleteMapping("/tag/deleteTag")
    public Object deleteTag(@RequestBody HashMap<String, String> body){

        System.out.println("\n****************\n"+"deleteTag"+"\n****************\n");

        if(!body.containsKey("id") || body.get("id").equals("")){
            return DAOFunctions.getResponse(400,"",null);
        }
        return DAOFunctions.getResponse(TagDAO.deleteTag(body.get("id")),"",null);
    }
}
