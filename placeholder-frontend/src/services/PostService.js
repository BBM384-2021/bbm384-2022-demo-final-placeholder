import axios from "axios"


const baseURL = "https://placeholder-backend.herokuapp.com";

export function getMainFeed ( user_id, setPosts ) {
    axios.get(baseURL + "/post/getMainFeed", {
        params: {
            "user_id": user_id
        }
    }).then( (response) => {
        if (response.data.code === 200) { // success
            const posts = response.data.allPosts;
            setPosts(posts);
        } else {
            setPosts([]);
        }
    }).catch( (error) => console.log(error));
};