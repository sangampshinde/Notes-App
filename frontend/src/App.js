import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';

// component imports
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';

const routes =(
<Router>
   <Routes>
    <Route path="/dashboard" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp/>} />
  </Routes>
</Router>
)

function App() {

  return (
    <div className="App">
    {routes}
    </div>
  );
}

export default App;
