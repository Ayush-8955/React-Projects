import React from 'react'
import {useId } from 'react'
function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions =[] , // array of all currencies
  selectCurrency='usd',
  amountDisable=false,  // use in production grid (not necessary for present)
  currencyDisable=false, // use in production grid (not necessary for present)
  
  className = "",
}) {
 
  const amountInputId=useId()  // generate unique ids

  return (
      <div className={`bg-white p-3 rounded-lg text-sm flex  ${className}`}>
          <div className="w-1/2">
              <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
                  {label}
              </label>
              <input
                  id={amountInputId} 
                  className="outline-none w-full bg-transparent py-1.5"
                //   type="number"    
                  type="text"
                  placeholder="Amount"
                  disabled={amountDisable}  // When an input field is disabled, users cannot click on it, type in it, or interact with it in any way. Additionally, a disabled input field will not be submitted with the form.
                  value={amount}
                  onChange={(e)=>onAmountChange && onAmountChange(Number(e.target.value))}
                  // whenever the value of the input field changes (and the input loses focus(user has clicked away from the input field or moved the cursor to another element on the page)), the function inside the curly braces {} will be executed.
              />
          </div>
          <div className="w-1/2 flex flex-wrap justify-end text-right">
              <p className="text-black/40 mb-2 w-full">Currency Type</p>
              <select
                  className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                  value={selectCurrency}
                  onChange={(e)=>onCurrencyChange && onCurrencyChange(e.target.value)}
                  // what does this and condition means : 
                  /* The expression onCurrencyChange && onCurrencyChange(e.target.value) ensures that onCurrencyChange is defined (not undefined or null) before calling it with the value of the input field. This prevents errors that would occur if onCurrencyChange were not defined.

                 1.If onCurrencyChange is defined, it is called with e.target.value as its argument.
                 2. If onCurrencyChange is not defined, nothing happens */
                 // -> if onCurrencyChange is defined(not null or undefined) and condition take to next condition where it execute that function and if first condition false whole and false and nothing happened
                  disabled={currencyDisable}
                  
              >
                {currencyOptions.map((currencyValue)=> (<option key={currencyValue} value={currencyValue}>
                  {currencyValue} 
                      </option>
                )
                )}
                {/* if you want to use loops then keep remember about key  -> key helps in uniquely identifying elements which helps react to optimize rendering */}
                  
                      
              
              </select>
          </div>
      </div>
  );
}

export default InputBox;