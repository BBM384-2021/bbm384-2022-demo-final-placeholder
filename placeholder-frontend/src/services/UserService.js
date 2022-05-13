const axios = require("axios");

const client = axios.create({
  baseURL: "https://placeholder-backend.herokuapp.com/user",
});

//  TODO: Do we even have a use case for this?
// if not, DELETE DIS
// export async function getAllUsers() {
//   try {
//     client.get("/getAllUsers").then((res) => {
//       console.log(res);
//     });
//     const response = await fetch("/api/users");
//     return await response.json();
//   } catch (error) {
//     return [];
//   }
// }

export function createUser(data) {
  // const response = await fetch(`/api/user`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ user: data }),
  // });
  return client.post("/createUser", data);
}

export const getProfileData = ({ user_id, session_id }) => {
  return client.get("/getProfileData", {
    params: {
      requested_id: user_id,
      current_user_id: session_id,
    },
  });
};

export const getUser = (user_id) => {
  return client.get("/getUser", {
    params: {
      requested_id: user_id,
    },
  });
};
export const getAllUsers = () => {
  return client.get("/getAllUsers");
};

export const updateUser = ({ user, values, profilePic, coverUrl }) => {
  const {
    fullName,
    userType,
    email,
    phone,
    company,
    linkedinLink,
    githubLink,
  } = values ? values : {};
  return client.patch("/updateUser", {
    id: user.id,
    full_name: fullName ? fullName : user.full_name,
    user_type: userType ? userType : user.user_type,
    cs_mail: email ? email : user.cs_mail,
    phone: phone ? phone : user.phone,
    company: company ? company : user.company,
    linkedIn_url: linkedinLink ? linkedinLink : user.linkedIn_url,
    github_url: githubLink ? githubLink : user.github_url,
    alt_mail: user.alt_mail,
    profile_pic_path: profilePic ? profilePic : user.profile_pic_path,
    cover_url: coverUrl ? coverUrl : user.cover_url,
  });
};

export function deleteUser(user_id, cs_mail, user_password, user_type) {
  if (parseInt(user_type) === 0) {
    return client.delete("/deleteUser", {
      data: {
        user_id: user_id,
        cs_mail: cs_mail,
        user_password: user_password,
        user_type: user_type,
      },
    });
  }
  return client.delete("/deleteUser", {
    data: {
      user_id: user_id,
      cs_mail: cs_mail,
      user_password: user_password,
      user_type: "-1",
    },
  });
}

export function getUsersConnected(user_id) {
  return client.get("/getUsersConnected", {
    params: { current_user_id: user_id },
  });
}

export function updateLocalUser(user) {
  //TODO
}
