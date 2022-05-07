const axios = require("axios");

const client = axios.create({
  baseURL: "https://placeholder-backend.herokuapp.com/user",
});

//  TODO: Do we even have a use case for this? 
// if not, DELETE DIS
export async function getAllUsers() {
  try {
    client.get("/getAllUsers").then((res) => {
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

export const getUser = (user_id) => {
  return client.get("/getUser", {
    params: {
      requested_id: user_id,
    },
  });
};

export const updateUser = ({ user, values, profilePic, coverUrl }) => {
  const { fullName, email, phone, company, linkedinLink, githubLink } = values
    ? values
    : {};
  return client.patch("/updateUser", {
    id: user.id,
    full_name: fullName ? fullName : user.full_name,
    user_type: user.user_type,
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

export function getUsersConnected(user_id) {
  return client.get("/getUsersConnected", {
    params: { current_user_id: user_id },
  });
}