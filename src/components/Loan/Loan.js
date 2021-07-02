import classes from './LoanList.module.css';

const Loan = (props)=>{

    return (
        <li className={classes.loan}>
            <h2>{props.loan.type.label}</h2>
            <h3>Amount applied - {props.loan.amount.label}</h3>
            <p>Loan period -{props.loan.period.label}</p>
        </li>
    );
    
}
export default Loan;