import axios from "axios";

const client = axios.create({
  baseURL: "https://placeholder-backend.herokuapp.com/connection",
});

export const createConnection = (user_id, session_id) => {
  return client.post("/createConnection", {
    user1_id: user_id,
    user2_id: session_id,
  });
};
export const removeConnection = (user_id, session_id) => {
  return client.delete("/removeConnection", {
    data: { user1_id: user_id, user2_id: session_id },
  });
};
export const checkConnection = (user_id, session_id) => {
  return client.get("/checkConnection", {
    params: { user1_id: user_id, user2_id: session_id },
  });
};

export const removeAllConnections = () => {
  console.log("hepsi gitsin");
};
