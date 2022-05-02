import axios from "axios"

const baseURL = "https://placeholder-backend.herokuapp.com/post";

export function createComment ( curr_user_id, post_id, comment_body, setWaitResponse ) {
    axios.post(baseURL + "/addComment", {
        "post_id" : post_id,
        "user_id" : curr_user_id,
        "body" : comment_body,
        "share_date" : new Date().toISOString()
    }).then( (response) => {
        console.log(response);
        if (response.data.code === 200) {
            setWaitResponse(false);
        } else {
            // !TODO! print error message
        }
        // open the lock since it is finished
    }).catch( (error) => console.log(error) );
};