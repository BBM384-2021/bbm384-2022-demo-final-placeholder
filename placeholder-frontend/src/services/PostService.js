import axios from "axios";

const baseURL = "https://placeholder-backend.herokuapp.com/post";

export function getMainFeed(user_id, setPosts, selectedTags, setIsWaitResponse) {
  axios
    .get(baseURL + "/getMainFeed", {
      params: {
        user_id: user_id,
        tags: selectedTags.toString(),
      },
    })
    .then((response) => {
      if (response.data.code === 200) {
        // success
        // console.log(response);
        const posts = response.data.allPosts;
        setPosts(posts);
      } else {
        setPosts([]);
      }
      setIsWaitResponse(false);
    })
    .catch((error) => console.log(error));
}

export function postLike(user_id, post_id, setLikeLock) {
  axios
    .post(baseURL + "/likePost", {
      post_id: post_id,
      user_id: user_id,
    })
    .then((response) => {
      if (response.data.code === 200) {
        // console.log(response)
      } else {
        // !TODO! print error message
      }
      // open the lock since it is finished
      setLikeLock(false);
    })
    .catch((error) => console.log(error));
}

export function deleteLike(user_id, post_id, setLikeLock) {
  axios
    .delete(baseURL + "/removeLike", {
      data: {
        post_id: post_id,
        user_id: user_id,
      },
    })
    .then((response) => {
      if (response.data.code === 200) {
        // console.log(response)
      } else {
        // !TODO! print error message
      }

      // open the lock since it is finished
      setLikeLock(false);
    })
    .catch((error) => console.log(error));
}

export function getPost(post_id, setState, finishFunction) {
  axios
    .get(baseURL + "/getPost", {
      params: {
        post_id: post_id,
      },
    })
    .then((response) => {
      if (response.data.code === 200) {
        setState(response.data.post);
      } else {
      }
      finishFunction();
    });
}

export function addPost(user_id, post_body, attachment, tags) {
  let visual_path_url = attachment;
  if (visual_path_url !== null) {
    // DO S3 related stuff
  }
  return axios.post(baseURL + "/addPost", {
    post: {
      user_id: user_id,
      post_body: post_body,
      post_share_date: new Date().toISOString(),
      post_visual_data_path: visual_path_url,
    },
    tags: tags,
  });
}

export function getAllPostsOfUser(user_id) {
  return axios.get(baseURL + "/getAllPostsOfAUser", {
    params: {
      user_id: user_id,
    },
  });
}

export function updatePost( post_id, post_body, post_visual_data_path, tags ) {
  return axios.patch(baseURL + "/updatePost", {
    "post": {
      "id" : post_id,
      "post_body" : post_body,
      "post_visual_data_path" : post_visual_data_path
    },
    "tags" : tags
  });
}

export function deletePost ( post_id ) {
  return axios.delete(baseURL + "/deletePost", {
    data : {
      "id" : post_id
    }
  })
}