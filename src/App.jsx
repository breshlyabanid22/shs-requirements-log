import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './Navbar'
import axios from 'axios';
function App() {
  const [toast, setToast] = useState("");
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({
    Date: '',
    Name: '',
    Strand: 'STEM',
    ReportCard: 'Original',
    GoodMoral: 'Original',
    PSA: 'Original',
    ESC: 'Original',
    TestResult: 'Complete',
    Remarks: '',
  });
  window.googleDocCallback = function () { return true; };
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setFormData(prevFormData => ({
      ...prevFormData,
      Date: formattedDate
    }));
  }, []);

  useEffect(() => {
    if(toast){
      const timeout = setTimeout(() => {
        setToast("");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);


    const formDataToSend = new FormData();

    formDataToSend.append('Date', formData.Date);
    formDataToSend.append('Name', formData.Name);
    formDataToSend.append('Strand', formData.Strand);
    formDataToSend.append('ReportCard', formData.ReportCard);
    formDataToSend.append('GoodMoral', formData.GoodMoral);
    formDataToSend.append('PSA', formData.PSA);
    formDataToSend.append('ESC', formData.ESC);
    formDataToSend.append('TestResult', formData.TestResult);
    formDataToSend.append('Remarks', formData.Remarks);

    axios.post("https://script.google.com/macros/s/AKfycbyGcDzU77RdS9Uqu41IqMvYoopMAjQiUkaMKHv4TQpGwkikwtKXlNqK-0t5GPqiEs-t/exec", formDataToSend, {
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => {
      console.log(res);
      setIsError(false);
      setToast("Successfully saved!");
    }).catch(error => {
      console.error(error)
      setIsError(true);
      setToast("There's an error saving the data. Please try again!");
    })
  };

  return (
    <>
    <Navbar/>
    <div className='form-container'>
      <form onSubmit={handleSubmit} method='POST' action='https://script.google.com/macros/s/AKfycbxmncrBuO7OAYXNmYR1tQsLEB58OYjvOy0v7qCxO2hzZte3R2u5lau371roA43HQNU6/exec' >
        <span className={`${toast ? 'toast-span': 'toast-hidden'} ${isError ? 'toast-error': ''}`}>{toast}</span>
        <input 
          className='name-input'
          type="text" 
          name='Name'
          placeholder='Student Name' 
          value={formData.Name}
          onChange={handleChange}
          required
          />
        <select
          id='Strand'
          name='Strand'
          value={formData.Strand}
          onChange={handleChange}
          required 
        >
          <option value="STEM">STEM</option>
          <option value="ABM">ABM</option>
          <option value="GAS">GAS</option>
        </select>
        <input
          type="date"
          name='Date' 
          placeholder='Date'
          value={formData.Date}
          onChange={handleChange}
          disabled
          />
        <h3>Submitted Requirements</h3>
       <div className='requirements-container'>
        <p>1. Report Card</p>
          <label>
            Original
            <input 
              id='ReportCard'
              type="radio"
              name='ReportCard'
              value='Original'
              checked={formData.ReportCard === "Original"}
              onChange={handleChange} />
          </label>
          <label>
            Photocopy
            <input 
              id='ReportCard'
              type="radio"
              name='ReportCard'
              value='Photocopy'
              checked={formData.ReportCard === "Photocopy"}
              onChange={handleChange} />
          </label>
          <p>2. Good Moral</p>
          <label>
            Original
            <input 
              id='GoodMoral'
              type="radio"
              name='GoodMoral'
              value='Original'
              checked={formData.GoodMoral === "Original"}
              onChange={handleChange} />
          </label>
          <label>
            Photocopy
            <input 
              id='GoodMoral'
              type="radio"
              name='GoodMoral'
              value='Photocopy'
              checked={formData.GoodMoral === "Photocopy"}
              onChange={handleChange} />
          </label>
          <p>3. PSA</p>
          <label>
            Original
            <input 
              id='PSA'
              type="radio"
              name='PSA'
              value='Original'
              checked={formData.PSA === "Original"}
              onChange={handleChange} />
          </label>
          <label>
            Photocopy
            <input 
              id='PSA'
              type="radio"
              name='PSA'
              value='Photocopy'
              checked={formData.PSA === "Photocopy"}
              onChange={handleChange} />
          </label>
          <p>4. ESC Certificate</p>
          <label>
            Original
            <input 
              id='ESC'
              type="radio"
              name='ESC'
              value='Original'
              checked={formData.ESC === "Original"}
              onChange={handleChange} />
          </label>
          <label>
            No Submission
            <input 
              id='ESC'
              type="radio"
              name='ESC'
              value='No Submission'
              checked={formData.ESC === "No Submission"}
              onChange={handleChange} />
          </label>
          <p>5. Exam Result</p>
          <label>
            Complete
            <input 
              id='TestResult'
              type="radio"
              name='TestResult'
              value='Complete'
              checked={formData.TestResult === "Complete"}
              onChange={handleChange} />
          </label>
          <label>
            Missing
            <input 
              id='TestResult'
              type="radio"
              name='TestResult'
              value='Missing'
              checked={formData.TestResult === "Missing"}
              onChange={handleChange} />
          </label>
       </div>
       <button type='submit'>Save</button>
      </form>
    </div>
    </>
  )
}

export default App
