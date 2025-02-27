import { BrowserRouter } from "react-router";
// import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main className="flex flex-col justify-center gap-2.5">
          <Hero />
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
