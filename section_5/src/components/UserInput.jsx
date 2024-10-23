const UserInput = (props) => {
  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label htmlFor="">초기 투자액</label>
          <input
            type="number"
            value={props.userInput.initialInvestment}
            required
            onChange={(e) => props.onChange("initialInvestment", e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="">연간 투자량</label>
          <input
            type="number"
            value={props.userInput.annualInvestment}
            required
            onChange={(e) => props.onChange("annualInvestment", e.target.value)}
          />
        </p>
      </div>

      <div className="input-group">
        <p>
          <label htmlFor="">예상 수익</label>
          <input
            type="number"
            value={props.userInput.expectedReturn}
            required
            onChange={(e) => props.onChange("expectedReturn", e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="">투자 기간</label>
          <input
            type="number"
            value={props.userInput.duration}
            required
            onChange={(e) => props.onChange("duration", e.target.value)}
          />
        </p>
      </div>
    </section>
  );
};

export default UserInput;
