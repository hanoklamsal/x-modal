import React, { useState } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [dobError, setDobError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleCloseModal = (e) => {
    if (e.target.classList.contains("modal")) {
      setIsOpen(false);
      setFormData({
        username: "",
        email: "",
        phone: "",
        dob: "",
      });
      setEmailError("");
      setPhoneError("");
      setDobError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setEmailError("");
    setPhoneError("");
    setDobError("");

    let hasError = false;

    if (!formData.email) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!formData.email.includes("@")) {
      setEmailError(`Please include an '@' in the email address. ${formData.email} is missing an '@'`);
      hasError = true;
    }

    if (!formData.phone) {
      setPhoneError("Phone number is required");
      hasError = true;
    } else if (formData.phone.length !== 10) {
      setPhoneError("Invalid phone number. Please enter a 10-digit phone number.");
      hasError = true;
    }

    if (!formData.dob) {
      setDobError("Date of birth is required");
      hasError = true;
    } else if (new Date(formData.dob) > new Date()) {
      setDobError("Invalid date of birth. Date of birth cannot be in future.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    alert("Form submitted successfully!");
    handleCloseModal({ target: { classList: ['modal'] } }); // Close modal on successful form submission
  };

  return (
    <div className="App">
      <h1>User Details Modal</h1>
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)}>Open Form</button>
      ) : (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
              <h2>Fill Details</h2>

              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                required
              />

              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {emailError && <div className="error">{emailError}</div>}

              <label htmlFor="phone">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {phoneError && <div className="error">{phoneError}</div>}

              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
              {dobError && <div className="error">{dobError}</div>}

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
