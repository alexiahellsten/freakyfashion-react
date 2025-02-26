import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Button variant="outline">Button</Button>
    </>
  );
}

export default App;
