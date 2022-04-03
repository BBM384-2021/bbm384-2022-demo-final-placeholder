import { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";
import "./WelcomeStyles.scss";

function WelcomeScreen() {
  const [loginActive, setLoginActive] = useState();
  const { isLogginActive } = this.state;
  const current = isLogginActive ? "Register" : "Login";
  return (
    <div className="App">
      <div className="login">
        <div className="container" ref={(ref) => (this.container = ref)}>
          {isLogginActive && (
            <Login containerRef={(ref) => (this.current = ref)} />
          )}
          {!isLogginActive && (
            <Register containerRef={(ref) => (this.current = ref)} />
          )}
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;
