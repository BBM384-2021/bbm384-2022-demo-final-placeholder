import React, {useState} from 'react';
import WelcomeScreen from "./pages/WelcomeScreen";

import "./App.css";
import HomePageScreen from './pages/HomePageScreen';

function App() {
  const [user, setUser] = useState();

  return (
    <div className="App">
      {!user ? <WelcomeScreen /> : <HomePageScreen user = {user} setUser={setUser} />}
    </div>
  );
}

export default App;
