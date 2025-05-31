const mongoose = require("mongoose");

const borrowerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  residenceType: { type: String },
  monthlyIncome: { type: Number },
  previousLoan: { type: Boolean },
  maritalStatus: { type: String },
  numberOfDependency: { type: Number },
  city: { type: String },
  state: { type: String }
});

module.exports = mongoose.model("Borrower", borrowerSchema);
