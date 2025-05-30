import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";

function App() {
  const [toast, setToast] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    Date: "",
    Name: "",
    Strand: "STEM",
    ReportCard: "",
    GoodMoral: "",
    PSA: "",
    ESC: "",
    TestResult: "",
    Remarks: "",
  });

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      Date: formattedDate,
    }));
  }, []);

  useEffect(() => {
    
    if (toast) {
      const timeout = setTimeout(() => {
        setToast("");
      }, 2000);
      return () => clearTimeout(timeout);
    }
    
  },[loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    setLoading(true);

    const formDataToSend = new FormData();

    formDataToSend.append("Date", formData.Date);
    formDataToSend.append("Name", formData.Name);
    formDataToSend.append("Strand", formData.Strand);
    formDataToSend.append("ReportCard", formData.ReportCard);
    formDataToSend.append("GoodMoral", formData.GoodMoral);
    formDataToSend.append("PSA", formData.PSA);
    formDataToSend.append("ESC", formData.ESC);
    formDataToSend.append("TestResult", formData.TestResult);
    formDataToSend.append("Remarks", formData.Remarks);

    axios.post(
        "https://api.apispreadsheets.com/data/Woumo0uq9gnIDRW9/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
        setFormData({
          Name: "",
          Date: formattedDate,
          Strand: "STEM",
          ReportCard: "",
          GoodMoral: "",
          PSA: "",
          ESC: "",
          TestResult: "",
          Remarks: "",
        });
        setIsError(false);
        setToast("Successfully saved!");
      })
      .catch((error) => {
        console.error(error);
        setLoading(false)
        setIsError(true);
        setToast("There's an error saving the data. Please try again!");
      });
  };

  let [color, setColor] = useState("#800000");
  return (
    <>
      <Navbar />
      <div className="form-container">
        {loading ? (
          <div className="loader">
            <FadeLoader
              color={color}
              loading={loading}
              size={50}
              data-testid="loader"
            />
            <p> Saving...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <span
              className={`${toast ? "toast-span" : "toast-hidden"} ${
                isError ? "toast-error" : ""
              }`}
            >
              {toast}
            </span>
            <input
              className="name-input"
              type="text"
              name="Name"
              placeholder="Student's Name"
              value={formData.Name}
              onChange={handleChange}
              required
              autoFocus
            />
            <select
              id="Strand"
              name="Strand"
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
              name="Date"
              placeholder="Date"
              value={formData.Date}
              onChange={handleChange}
              disabled
            />
            <h3>Submitted Requirements</h3>
            <div className="requirements-container">
              <hr />
              <p>1. Report Card</p>
              <label>
                Complete
                <input
                  id="ReportCard"
                  type="radio"
                  name="ReportCard"
                  value="Complete"
                  checked={formData.ReportCard === "Complete"}
                  onChange={handleChange}
                />
              </label>
              <label>
                Incomplete
                <input
                  id="ReportCard"
                  type="radio"
                  name="ReportCard"
                  value="Incomplete"
                  checked={formData.ReportCard === "Incomplete"}
                  onChange={handleChange}
                />
              </label>
              <hr />
              <p>2. Birth Certificate/PSA</p>
              <label>
                Original
                <input
                  id="PSA"
                  type="radio"
                  name="PSA"
                  value="Original"
                  checked={formData.PSA === "Original"}
                  onChange={handleChange}
                />
              </label>
              <label>
                Photocopy
                <input
                  id="PSA"
                  type="radio"
                  name="PSA"
                  value="Photocopy"
                  checked={formData.PSA === "Photocopy"}
                  onChange={handleChange}
                />
              </label>
              <hr />
              <p>3. Good Moral</p>
              <label>
                Original
                <input
                  id="GoodMoral"
                  type="radio"
                  name="GoodMoral"
                  value="Original"
                  checked={formData.GoodMoral === "Original"}
                  onChange={handleChange}
                />
              </label>
              <label>
                Photocopy
                <input
                  id="GoodMoral"
                  type="radio"
                  name="GoodMoral"
                  value="Photocopy"
                  checked={formData.GoodMoral === "Photocopy"}
                  onChange={handleChange}
                />
              </label>
              <hr />
              <p>4. ESC Certificate</p>
              <label>
                Original
                <input
                  id="ESC"
                  type="radio"
                  name="ESC"
                  value="Original"
                  checked={formData.ESC === "Original"}
                  onChange={handleChange}
                />
              </label>
              <label>
                No Submission
                <input
                  id="ESC"
                  type="radio"
                  name="ESC"
                  value="No Submission"
                  checked={formData.ESC === "No Submission"}
                  onChange={handleChange}
                />
              </label>
              <hr />
              <p>5. Exam Result</p>
              <label>
                Complete
                <input
                  id="TestResult"
                  type="radio"
                  name="TestResult"
                  value="Complete"
                  checked={formData.TestResult === "Complete"}
                  onChange={handleChange}
                />
              </label>
              <label>
                Missing
                <input
                  id="TestResult"
                  type="radio"
                  name="TestResult"
                  value="Missing"
                  checked={formData.TestResult === "Missing"}
                  onChange={handleChange}
                />
              </label>
              <hr />
            </div>
            <a
              className="sheet-link"
              target="_blank"
              href="https://docs.google.com/spreadsheets/d/1kSf6egKSMFDMyDlQNiT_Rslzs8me-c9SkHRhUoEdaRI/edit?usp=sharing"
            >
              Open Google Sheets
            </a>
            <button type="submit">Save</button>
          </form>
        )}
      </div>
    </>
  );
}

export default App;
