package Placeholder.backend.Util;

import java.util.HashMap;

public class DAOFunctions {

    public static Object getResponse(int code, String objectName, Object object){


        HashMap<String,Object> res = new HashMap<String,Object>();
        res.put("code",code);
        if(!objectName.equals("")){
            res.put(objectName,object);
        }
        return res;

    }

}
