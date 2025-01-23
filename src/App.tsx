import { useState, useEffect } from "react";

function App() {
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) {
      setGreeting("Morning");
    } else if (hours < 17) {
      setGreeting("Afternoon");
    } else {
      setGreeting("Evening");
    }
  }, []);

  return (
    <>
      <h1>Good {greeting}!</h1>
    </>
  );
}

export default App;
