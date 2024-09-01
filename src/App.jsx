import { useState,useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios'
function App() {

  const [amount, setAmount] = useState(1)
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("INR")
  const [convertedAmount, setConvertedAmount] = useState(null)
  const [exchangeRate, setExchangeRate] = useState(null)

  useEffect(()=>{
    const getExchageRate = async () => {
      try{
        let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        const response = await axios.get(url)
        setExchangeRate(response.data.rates[toCurrency])
      }
      catch(error){
        console.error("error is",error);
      }
    }
    getExchageRate()
  },[fromCurrency, toCurrency])

  useEffect(()=>{
    if (exchangeRate!==null){
      setConvertedAmount((amount * exchangeRate).toFixed(2))
    }
  },[amount,exchangeRate])

  const handleAmountChange = (e) =>{
    const value = parseFloat(e.target.value)
    setAmount(isNaN(value)?0:value)
  }

  const handleFromCurrencyChange = (e) =>{
    setFromCurrency(e.target.value)
  }
  const handleToCurrencyChange = (e) =>{
    setToCurrency(e.target.value)
  }
  return (

  <div className='outerMost'>
      <h2>Currency Converter</h2>
      <label htmlFor="" className='text-primary'>Amount</label>
      <InputGroup className="mb-3">
        <Form.Control
          type='number'
          placeholder="Amount"
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={amount}
          onChange={handleAmountChange}
        />
      </InputGroup>

      <label htmlFor="" className='text-primary '>From Currency</label>
      <Form.Select aria-label="Default select example" 
      value={fromCurrency} onChange={handleFromCurrencyChange} className='mb-3'>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="AMD">AMD</option>
        <option value="ARS">ARS</option>
        <option value="CLP">CLP</option>
        <option value="DKK">DKK</option>
        <option value="FKP">FKP</option>
        <option value="GEL">GEL</option>
        <option value="INR">INR</option>
        <option value="JPY">JPY</option>
        <option value="OMR">OMR</option>
        <option value="QAR">QAR</option>
        <option value="RON">RON</option>
        <option value="RSD">RSD</option>
        <option value="SAR">SAR</option>
      </Form.Select>
      <label htmlFor="" className='text-primary '>To Currency</label>
      <Form.Select aria-label="Default select example" 
      value={toCurrency} onChange={handleToCurrencyChange}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="AMD">AMD</option>
        <option value="ARS">ARS</option>
        <option value="CLP">CLP</option>
        <option value="DKK">DKK</option>
        <option value="FKP">FKP</option>
        <option value="GEL">GEL</option>
        <option value="INR">INR</option>
        <option value="JPY">JPY</option>
        <option value="OMR">OMR</option>
        <option value="QAR">QAR</option>
        <option value="RON">RON</option>
        <option value="RSD">RSD</option>
        <option value="SAR">SAR</option>
      </Form.Select>
      <div className="resultBox">
      <p className='text-center'>{amount} {fromCurrency} = {convertedAmount} {toCurrency}</p>
      </div>


   </div>
  )
  
}

export default App





