import axios from "axios"


const baseURL = "https://placeholder-backend.herokuapp.com/post";

export function getMainFeed ( user_id, setPosts ) {
    axios.get(baseURL + "/getMainFeed", {
        params: {
            "user_id": user_id,
            "tags":"11,21"
        }
    }).then( (response) => {
        if (response.data.code === 200) { // success
            console.log(response);
            const posts = response.data.allPosts;
            setPosts(posts);
        } else {
            setPosts([]);
        }
    }).catch( (error) => console.log(error));
};

export function postLike ( user_id, post_id ) {
    axios.post(baseURL + "/likePost", {
        "post_id" : post_id,
        "user_id" : user_id
    }).then( (response) => {
        if (response.data.code === 200) {
            // console.log(response)
        } else {
            // !TODO! print error message
        }
    }).catch( (error) => console.log(error) );
};

export function deleteLike ( user_id, post_id ) {
    axios.delete(baseURL + "/removeLike", {
        data:{
            "post_id" : post_id,
            "user_id" : user_id
        }
    }).then( (response) => {
        if (response.data.code === 200) {
            // console.log(response)
        } else {
            // !TODO! print error message 
        }
    }).catch( (error) => console.log(error) );
}