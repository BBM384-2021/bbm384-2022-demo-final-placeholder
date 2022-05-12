import axios from "axios";

const client = axios.create({
  baseURL: "https://placeholder-backend.herokuapp.com/message",
});

export const sendMessage = ({ sender_id, receiver_id, message }) => {
  console.log(sender_id, receiver_id, message);
  return client.post("/send", {
    sender_id: sender_id,
    receiver_id: receiver_id,
    body: message,
    date: new Date().toISOString(),
  });
};

export const getMessages = ({ session_id, user_id }) => {
  return client.get("/getMessageLogForAUser", {
    params: {
      current_user_id: session_id,
      other_user_id: user_id,
    },
  });
};

export const updateMessage = ({ message_id, message }) => {
  return client.patch("/updateMessage", {
    id: message_id,
    body: message,
  });
};

export const deleteMessage = (message_id) => {
  return client.delete("/deleteMessage", {
    data: { id: message_id },
  });
};
