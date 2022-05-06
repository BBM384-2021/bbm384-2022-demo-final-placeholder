import axios from "axios";

const baseURL = "https://placeholder-backend.herokuapp.com/post";

export function createComment(
  curr_user_id,
  post_id,
  comment_body,
  finishFunction
) {
  axios
    .post(baseURL + "/addComment", {
      post_id: post_id,
      user_id: curr_user_id,
      body: comment_body,
      share_date: new Date().toISOString(),
    })
    .then((response) => {
      if (response.data.code === 200) {
        finishFunction();
      } else {
        // !TODO! print error message
      }
      // open the lock since it is finished
    })
    .catch((error) => console.log(error));
}

export function updateComment(comment_id, body, finishFunction) {
  axios
    .patch(baseURL + "/updateComment", {
      body: body,
      id: comment_id,
    })
    .then((response) => {
      if (response.data.code === 200) {
        finishFunction();
      } else {
        // TODO print error message
      }
    })
    .catch((error) => console.log(error));
}

export function deleteComment(comment_id, finishFunction) {
  axios
    .delete(baseURL + "/deleteComment", {
      data: {
        id: comment_id,
      },
    })
    .then((response) => {
      if (response.data.code === 200) {
        finishFunction();
      } else {
        // !TODO! print error message
      }
    })
    .catch((error) => console.log(error));
}
