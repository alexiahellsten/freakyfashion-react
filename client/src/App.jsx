import { BrowserRouter } from "react-router";
// import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Spots from "./components/Spots/Spots";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main className="flex flex-col justify-center gap-2.5">
          <Hero />
          <Spots className="hidden lg:visible" />
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
