import { BrowserRouter } from "react-router";
// import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </>
  );
}

export default App;
