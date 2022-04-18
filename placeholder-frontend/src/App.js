import React, { useState } from "react";
import axios from "axios";

import WelcomeScreen from "./pages/WelcomeScreen";
import HomePageScreen from "./pages/HomePageScreen";

import "./App.css";

const client = axios.create({
  baseURL: "https://placeholder-backend.herokuapp.com/",
});

client.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let res = error.response;
    if (res.status === 401) {
      window.location.href = "https://example.com/login";
    }
    console.error("Looks like there was a problem. Status Code:" + res.status);
    return Promise.reject(error);
  }
);

function App() {
  const [user, setUser] = useState();
  // const { data, error, loading } = useAxios({
  //   url: "https://jsonplaceholder.typicode.com/posts/1"
  // });

  return (
    <div className="App">
      {!user ? (
        <WelcomeScreen setUser={setUser} />
      ) : (
        <HomePageScreen user={user} setUser={setUser} />
      )}
    </div>
  );
}
export default App;
