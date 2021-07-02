import { useState, useEffect, useCallback } from 'react';
import Dropdown from 'react-dropdown';
import classes from './ApplyLoanForm.module.css';
import LoanList from './LoanList';
const ApplyLoanForm =() =>{
    const [loanType,setLoanType] = useState();
    const [loanAmount, setLoanAmount] = useState();
    const [loanPeriod, setLoanPeriod] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [loans, setLoans] = useState([]);
    const loanOptions =[
        { value: 'Personal Loan ', label: 'Personal Loan - 13.2%' },
        { value: 'Home Loan', label: 'Home Loan - 10%' },
        { value: 'Students Loan', label: 'Students Loan - 8%' }
       
      ];
    const amountOptions =["50000", "1,00000", "1,50000", "2,00000","2,50000", "3,00000","3,50000","4,00000","4,50000", "5,00000"  ]
    const periodOptions = ["12 months", "24 months", "30 months","36 months"];
    const submitHandler =(event) =>{
        event.preventDefault();
        setIsLoading(true);
        //alert("hi");
        const loan ={
            type : loanType,
            amount :loanAmount,
            period : loanPeriod
        }
        fetch("https://react485560-default-rtdb.firebaseio.com/loans.json",{
            method: 'POST',
            body: JSON.stringify(loan),
            headers: {
              'Content-Type': 'application/json'
            }
        }).then((res) => {
            setIsLoading(false);
            if (res.ok) {
              alert("Loan Request Submitted Successfully");
              fetchLoansHandler();
              return res.json();
            } else {
              return res.json().then((data) => {
                let errorMessage = 'Authentication failed!';           
                throw new Error(errorMessage);
              });
            }
          })
        
          
    }
    const fetchLoansHandler = useCallback(async () => {
        setIsLoading(true);
        //setError(null);
        try {
          const response = await fetch('https://react485560-default-rtdb.firebaseio.com/loans.json');
          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
    
          const data = await response.json();
    
          const loanList = [];
    
          for (const key in data) {
            loanList.push({
              id: key,
              type: data[key].type,
              amount: data[key].amount,
              period: data[key].period,
            });
          }
    
          setLoans(loanList);
          //alert("loans")
        } catch (error) {
          //setError(error.message);
        }
        setIsLoading(false);
      }, []);
    
      useEffect(() => {
        fetchLoansHandler();
      }, [fetchLoansHandler]);

    return (
      <section>
        <section className={classes.loan}>
        <h1>Apply Loan</h1>
          <form onSubmit={submitHandler}>
            <div className={classes.control}>
              <label htmlFor='type'>Loan Type</label>
              <Dropdown options={loanOptions} onChange={(values) => setLoanType(values)} />
            </div>
            <div className={classes.control}>
              <label htmlFor='amount'>Loan Amount</label>
              <Dropdown options={amountOptions} onChange={(values) => setLoanAmount(values)} />
            </div>
            <div className={classes.control}>
              <label htmlFor='period'>Loan Period</label>
              <Dropdown options={periodOptions} onChange={(values) => setLoanPeriod(values)} />
            </div>
            <div className={classes.actions}>
              {isLoading && <p>Sending Request....</p>}
              <button>Apply</button>
            </div>
            
          </form>
          </section>
          <div className={classes.loan}>
            <h1>Your Loans - {loans.length}</h1>
            <LoanList loans ={loans} />
          </div>
        </section>
      );
}
export default ApplyLoanForm;