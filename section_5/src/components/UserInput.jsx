import { useState } from "react";

const UserInput = () => {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  const handleChange = (inputId, newValue) => {
    setUserInput((prevInput) => ({
      ...prevInput,
      [inputId]: newValue,
    }));
  };

  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label htmlFor="">초기 투자액</label>
          <input
            type="number"
            value={userInput.initialInvestment}
            required
            onChange={(e) => handleChange("initialInvestment", e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="">연간 투자량</label>
          <input
            type="number"
            value={userInput.annualInvestment}
            required
            onChange={(e) => handleChange("annualInvestment", e.target.value)}
          />
        </p>
      </div>

      <div className="input-group">
        <p>
          <label htmlFor="">예상 수익</label>
          <input
            type="number"
            value={userInput.expectedReturn}
            required
            onChange={(e) => handleChange("expectedReturn", e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="">투자 기간</label>
          <input
            type="number"
            value={userInput.duration}
            required
            onChange={(e) => handleChange("duration", e.target.value)}
          />
        </p>
      </div>
    </section>
  );
};

export default UserInput;
