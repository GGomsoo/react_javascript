import { useState } from "react";

import Header from "./components/Header";
import Results from "./components/Results";
import UserInput from "./components/UserInput";

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  const validInput = userInput.duration >= 1;

  const handleChange = (inputId, newValue) => {
    setUserInput((prevInput) => ({
      ...prevInput,
      [inputId]: +newValue,
    }));
  };

  return (
    <>
      <Header />
      <UserInput userInput={userInput} onChange={handleChange} />
      {validInput ? (
        <Results input={userInput} />
      ) : (
        <p className="center">올바른 값 입력바람</p>
      )}
    </>
  );
}

export default App;
