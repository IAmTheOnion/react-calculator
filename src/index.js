import React, { isValidElement, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const Button = ({ value, onClick }) => {
  return (
    <button className='btn btn-dark m-1' onClick={onClick}>
      {value}
    </button>
  );
 };
 
 
 const Calculator = () => {
 const [values, setValues] = useState("");
 
  const handleNumberClick = (number) => {
   if (number === "0" && ((isNaN(values.slice(-1) && values.slice(-1)) == ".") || values.length < 1)) {
     return
   }
   
    setValues(values + number);
  };
 
  const canAppendDecimal = () => {
   for (let i = values.length; i > 0; i--) {
     if (['+', '-', '*', '/'].includes(values[i])) {
       return true
     } else if (values[i] == ".") {
       return false
     }
   }
   return true
  }
 
  const handleOperatorClick = (operator) => {
     if (values.length < 1) {
       return
     }
 
     if (isNaN(values.slice(-1))) {
       if (operator != "-") {
         if (isNaN(values.slice(-2,-1))) {
           setValues(values.slice(0,-2) + operator)
           return
         }
         setValues(values.slice(0,-1) + operator)
         return
       }
       
       if (operator == "-" && values.slice(-1) != "-") {
         setValues(values + operator)
         return
       }
     }
    
    if (operator == "-" && values.slice(-1) == "-") {
      return
    }
 
     setValues(values + operator)
  };
 
  const handleEqualsClick = () => {
   try {
     setValues(String(eval(values)))
   } catch {
     setValues("")
   }
  };
 
  const handleDecimalClick = () => {
   if (isNaN(values.slice(-1)) || !canAppendDecimal()) {
     return
   }
 
   if (values.length === 0) {
     setValues("0.")
     return
   }
 
   setValues(values + ".")
  }
 
  const handleClearClick = () => {
    setValues("");
  };
  
   return (
     <div style={{width: "240px", height: "330px"}}>
       <div className="bg-dark m-1" id="display">{values.length !== 0 ? values : "0"}</div>
       <div>
         <Button value='1' onClick={() => handleNumberClick('1')} />
         <Button value='2' onClick={() => handleNumberClick('2')} />
         <Button value='3' onClick={() => handleNumberClick('3')} />
         <Button value='+' onClick={() => handleOperatorClick('+')} />
       </div>
       <div>
         <Button value='4' onClick={() => handleNumberClick('4')} />
         <Button value='5' onClick={() => handleNumberClick('5')} />
         <Button value='6' onClick={() => handleNumberClick('6')} />
         <Button value='-' onClick={() => handleOperatorClick('-')} />
       </div>
       <div>
         <Button value='7' onClick={() => handleNumberClick('7')} />
         <Button value='8' onClick={() => handleNumberClick('8')} />
         <Button value='9' onClick={() => handleNumberClick('9')} />
         <Button value='*' onClick={() => handleOperatorClick('*')} />
       </div>
       <div>
         <Button value='0' onClick={() => handleNumberClick('0')} />
         <Button value='/' onClick={() => handleOperatorClick('/')} />
         <Button value='=' onClick={handleEqualsClick} />
         <Button value='.' onClick={handleDecimalClick} />
         <div><Button value='AC' onClick={handleClearClick} /></div>
       </div>
     </div>
   );
  };
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
