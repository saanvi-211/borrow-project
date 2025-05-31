import React, { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    residenceType: "",
    monthlyIncome: "",
    previousLoan: false,
    maritalStatus: "",
    numberOfDependency: "",
    city: "",
    state: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Submitting...");
    try {
      const res = await fetch("http://localhost:5000/api/borrower/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          monthlyIncome: Number(formData.monthlyIncome),
          previousLoan: Boolean(formData.previousLoan),
          numberOfDependency: Number(formData.numberOfDependency),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Successfully submitted!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          residenceType: "",
          monthlyIncome: "",
          previousLoan: false,
          maritalStatus: "",
          numberOfDependency: "",
          city: "",
          state: "",
        });
      } else {
        setMessage(data.error || "Submission failed");
      }
    } catch (error) {
      setMessage("Error submitting form");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Borrower Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:<br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label><br /><br />

        <label>
          Email:<br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label><br /><br />

        <label>
          Phone:<br />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label><br /><br />

        <label>
          Residence Type:<br />
          <input
            type="text"
            name="residenceType"
            value={formData.residenceType}
            onChange={handleChange}
          />
        </label><br /><br />

        <label>
          Monthly Income:<br />
          <input
            type="number"
            name="monthlyIncome"
            value={formData.monthlyIncome}
            onChange={handleChange}
          />
        </label><br /><br />

        <label>
          Previous Loan:<br />
          <input
            type="checkbox"
            name="previousLoan"
            checked={formData.previousLoan}
            onChange={handleChange}
          />
        </label><br /><br />

        <label>
          Marital Status:<br />
          <input
            type="text"
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
          />
        </label><br /><br />

        <label>
          Number of Dependency:<br />
          <input
            type="number"
            name="numberOfDependency"
            value={formData.numberOfDependency}
            onChange={handleChange}
          />
        </label><br /><br />

        <label>
          City:<br />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </label><br /><br />

        <label>
          State:<br />
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </label><br /><br />

        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
