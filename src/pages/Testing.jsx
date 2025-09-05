import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Arrow from "../components/svgs/Arrow.svg";
import axios from "axios";

const Testing = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("idle");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateInput = (value) => {
    if (!value.trim()) {
      return "This field cannot be empty.";
    }
    if (/\d/.test(value)) {
      return "This field cannot contain numbers.";
    }
    return "";
  };

  const handleProceed = async () => {
    if (step === 1) {
      const nameError = validateInput(name);
      if (nameError) {
        setError(nameError);
      } else {
        setStep(2);
        setError("");
      }
    } else if (step === 2) {
      const locationError = validateInput(location);
      if (locationError) {
        setError(locationError);
        return;
      }
      
      setError("");
      setSubmissionStatus("loading"); 
      try {
        const response = await axios.post(
          'https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne',
          { name, location }
        );
        console.log("API Success:", response.data);
        setSubmissionStatus("success"); 
      } catch (err) {
        setError(err.response?.data?.message || "An API error occurred.");
        setSubmissionStatus("idle");
      }
    }
  };

  const handleFinish = () => {
    navigate('/result'); 
  };

  const handleBack = () => {
    setError("");
    if (step === 2) {
      if (submissionStatus !== 'idle') {
        setSubmissionStatus('idle'); 
      } else {
        setStep(1);
      }
    } else {
      navigate('/');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && submissionStatus === 'idle') {
      handleProceed();
    }
  };

  return (
    <main className="testing-container">
      <div className="testing-top-left">
        <p>TO START ANALYSIS</p>
      </div>

      <div className="rotating-square-wrapper">
        <div className="rotating-square outer"></div>
        <div className="rotating-square middle"></div>
        <div className="rotating-square inner"></div>
        <div className="input-content">
          {step === 1 && (
            <>
              <span>CLICK TO TYPE</span>
              <input
                type="text"
                placeholder="Introduce Yourself"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            </>
          )}
          {step === 2 && (
            <>
              {submissionStatus === 'idle' && (
                <>
                  <span>CLICK TO TYPE</span>
                  <input
                    type="text"
                    placeholder="Where are you from?"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                  />
                </>
              )}
              {submissionStatus === 'loading' && (
                <div className="status-text">
                  <p>Processing submission</p>
                  <div className="loading-dots">
                    <span>.</span><span>.</span><span>.</span>
                  </div>
                </div>
              )}
              {submissionStatus === 'success' && (
                <div className="status-text">
                  <p>Thank you!</p>
                  <span>Proceed for the next step</span>
                </div>
              )}
            </>
          )}
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>

      <button onClick={handleBack} className="testing-bottom-left">
        <img src={Arrow} alt="back arrow" className="arrow-svg left-arrow" />
        <span>BACK</span>
      </button>

      {submissionStatus === 'success' && (
        <button onClick={handleFinish} className="testing-bottom-right">
          <span>PROCEED</span>
          <img src={Arrow} alt="proceed arrow" className="arrow-svg right-arrow" />
        </button>
      )}
    </main>
  );
};

export default Testing;
