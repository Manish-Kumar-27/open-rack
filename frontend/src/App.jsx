import React from "react"
import LandingPage from "./pages/landingpage/Landingpage";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage"
function App(){
  return (
  
    <Routes>
    
      <Route path=""  element={<LandingPage/>}/>
      <Route path="/home" element={<Homepage></Homepage>}/>
    </Routes>
  
  )
};

export default App;
