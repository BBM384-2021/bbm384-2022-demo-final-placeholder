import axios from "axios"


const baseURL = "https://placeholder-backend.herokuapp.com/post";

export function getMainFeed ( user_id, setPosts ) {
    axios.get(baseURL + "/getMainFeed", {
        params: {
            "user_id": user_id,
            "tags":""
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

export function postLike ( user_id, post_id, setLikeLock ) {
    axios.post(baseURL + "/likePost", {
        "post_id" : post_id,
        "user_id" : user_id
    }).then( (response) => {
        if (response.data.code === 200) {
            // console.log(response)
        } else {
            // !TODO! print error message
        }
        // open the lock since it is finished
        setLikeLock(false);
    }).catch( (error) => console.log(error) );
};

export function deleteLike ( user_id, post_id, setLikeLock ) {
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
        
        // open the lock since it is finished
        setLikeLock(false);
    }).catch( (error) => console.log(error) );
}

export function getPost ( post_id, setState, finishFunction ) {
    axios.get(baseURL + "/getPost", {
        params: {
            "post_id" : post_id
        }
    }).then( (response) => {
        console.log(response);
        if (response.data.code === 200) {
            setState(response.data.post);
        } else {

        }
        finishFunction();
    })
} 