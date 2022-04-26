const axios = require("axios");

export async function getAllUsers() {
  try {
    axios.get("/user/getAllUsers").then((res) => {
      console.log(res);
    });
    const response = await fetch("/api/users");
    return await response.json();
  } catch (error) {
    return [];
  }
}

export async function createUser(data) {
  const response = await fetch(`/api/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: data }),
  });
  return await response.json();
}

//TODO: arrange user service to make better api calls :d
const baseProfileURL = "https://placeholder-backend.herokuapp.com/user/getUser";
export const getUser =  (user_id) => {
    return axios.get(baseProfileURL, {
      params: {
        requested_id: user_id,
      },
    });
  };

// export const getUser = async (user_id) => {
//   let response = await axios.get(baseProfileURL, {
//     params: {
//       requested_id: user_id,
//     },
//   });
//   console.log("returned user is ", response.data.user);
//   const user = response.data.user;
//   return user;
// };
