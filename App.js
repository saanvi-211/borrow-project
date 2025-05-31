import React, { useState } from "react";

function App() {
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
    state: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/borrower/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Form submitted successfully!");
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
          state: ""
        });
      } else {
        alert("❌ Error: " + (data.error || "Server error"));
      }
    } catch (err) {
      alert("❌ Error submitting form. Check backend is running.");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "1rem" }}>
      <h2>Borrower Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required /><br /><br />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br /><br />
        <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required /><br /><br />
        <input type="text" name="residenceType" placeholder="Residence Type" value={formData.residenceType} onChange={handleChange} required /><br /><br />
        <input type="number" name="monthlyIncome" placeholder="Monthly Income" value={formData.monthlyIncome} onChange={handleChange} required /><br /><br />
        <label>
          Previous Loan: 
          <input type="checkbox" name="previousLoan" checked={formData.previousLoan} onChange={handleChange} />
        </label><br /><br />
        <input type="text" name="maritalStatus" placeholder="Marital Status" value={formData.maritalStatus} onChange={handleChange} required /><br /><br />
        <input type="number" name="numberOfDependency" placeholder="Number of Dependencies" value={formData.numberOfDependency} onChange={handleChange} required /><br /><br />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required /><br /><br />
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required /><br /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
