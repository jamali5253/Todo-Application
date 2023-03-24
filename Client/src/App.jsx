import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main_Todo from "./Main_Todo";
import Signin from "./mini-components/Signin";
import Signup from "./mini-components/Signup";
// import MainPage from "./MainPage";
import Todo from "./Todo";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/todo" element={<Main_Todo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
