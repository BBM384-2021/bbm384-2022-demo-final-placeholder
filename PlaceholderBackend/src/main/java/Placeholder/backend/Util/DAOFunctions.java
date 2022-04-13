package Placeholder.backend.Util;

import java.util.HashMap;
import java.util.List;

public class DAOFunctions {

    public static Object getResponse(int code, String objectName, Object object){


        HashMap<String,Object> res = new HashMap<String,Object>();
        res.put("code",code);
        if(!objectName.equals("")){
            res.put(objectName,object);
        }
        return res;

    }

    public static Object getResponseWithMultipleObjects(int code, List<String> objectNames, List<Object> objects){

        HashMap<String,Object> res = new HashMap<String,Object>();
        res.put("code",code);

        for(int i = 0 ; i<objectNames.size();i++){
            if(!objectNames.get(i).equals("")){
                res.put(objectNames.get(i),objects.get(i));
            }
        }

        return res;

    }

}
