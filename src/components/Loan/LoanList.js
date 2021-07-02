import classes from './LoanList.module.css';
import Loan from './Loan';
const LoanList = (props) => {
    return (
      <ul>
        {props.loans.map((loan) => (
         <Loan key ={loan.id} loan ={loan}/>
        ))}
      </ul>
    );
  };
  
  export default LoanList;