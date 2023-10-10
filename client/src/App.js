import { useState, useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import Body from "./components/nonFunctional/Body";
import Home from "./components/nonFunctional/Home";

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [files, setFiles] = useState(null);

  return (
    <div className="App">
      <header className="App-header"></header>
      <div>
        <Routes>
          <Route path="/" exact element={<Body setUser={setUser} />} />
          <Route
            path="/home"
            exact
            element={<Home user={user} setFiles={setFiles} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
