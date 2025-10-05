import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
// import About from "./Pages/About";
// import Students from "./Pages/Students";
// import Courses from "./Pages/Courses";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/students" element={<Students />} /> */}
        {/* <Route path="/courses" element={<Courses />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </>
  );
};

export default App;
