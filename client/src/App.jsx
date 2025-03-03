import { BrowserRouter } from "react-router";
// import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Spots from "./components/Spots/Spots";

function App() {
  return (
    <>
      <BrowserRouter>
        <header>
          <Navbar />
        </header>
        <main className="flex flex-col justify-center">
          <Hero />
          <Spots className="hidden lg:visible" />
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
