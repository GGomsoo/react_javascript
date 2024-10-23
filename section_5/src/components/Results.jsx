import { calculateInvestmentResults, formatter } from "../util/investment.js";

const Results = (props) => {
  const resData = calculateInvestmentResults(props.input);
  const initialInvestment =
    resData[0].valueEndOfYear -
    resData[0].interest -
    resData[0].annualInvestment;
  console.log(resData);
  return (
    <table id="result">
      <thead>
        <tr>
          <th>연</th>
          <th>투자량</th>
          <th>이자 (연)</th>
          <th>총합</th>
          <th>투하 자본</th>
        </tr>
      </thead>
      <tbody>
        {resData.map((yearData) => {
          const totalInterest =
            yearData.valueEndOfYear -
            yearData.annualInvestment * yearData.year -
            initialInvestment;

          const totalAmountInvested = yearData.valueEndOfYear - totalInterest;
          return (
            <tr key={yearData.year}>
              <td>{yearData.year}</td>
              <td>{formatter.format(yearData.valueEndOfYear)}</td>
              <td>{formatter.format(yearData.interest)}</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{formatter.format(totalAmountInvested)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Results;
