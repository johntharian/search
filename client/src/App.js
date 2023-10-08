import { useState,useEffect } from 'react';

import {Routes, Route} from "react-router-dom"
import axios from 'axios';

import Login from './components/Login'
import Logout from './components/Logout'
import IndexData from './components/IndexData';
import SearchBar from './components/Search';
import Images from './components/ImageGallery'


import Body from './components/nonFunctional/Body'
import Home from './components/nonFunctional/Home';

function App() {

  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [files, setFiles] = useState(null)


  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div>
      <Routes>
        <Route path="/" exact element={<Body setUser={setUser}/>} />
        <Route path="/home" exact element={<Home user={user} setFiles={setFiles} />} />
        {/* <Route path="/login" exact element={<Login />} /> */}
      </Routes>
      
      {/* {code === null ? (
          // Content to display when 'code' is null
          <Login setCode={setCode} />
        ) : (
          // Content to display when 'code' is not null
          <>
          <p>Code is not empty</p>
          <IndexData code={code.data}/>
          
            <>
            <SearchBar setFiles={setFiles}/> 
            </>
            {
              files === null ? (
                <>
                </>
              ) : (
                <>
                <Images code={code.data} _ids={files} />
                </>
              )
            }
            
            
          </>
        )} */}
        
          
      </div>
    </div>
  );
}

export default App;

