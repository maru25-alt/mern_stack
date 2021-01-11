import React, { useState } from "react";
//import { Link } from "react-router-dom";
import { clinicSignUp, clientSignUp } from "../../api.js";

import "./signup.css";

function SignUpForm() {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  // False Account makes it Client and True Account makes it Clinic
  const [accountType, setAccountType] = useState(false);
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    event.persist();
    setState((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      let submittedValues = {
        account: accountType ? "Clinic" : "Client",
        name: state.name,
        email: state.email,
        password: state.password,
      };
      if (validate()) {
        if (!accountType) {
          await clientSignUp(submittedValues);
        } else {
          await clinicSignUp(submittedValues);
        }
      }
      setStatus("Succeed POST");
    } catch {
      setStatus("Unable to POST");
    } finally {
      setTimeout(() => {
        setStatus(null);
      }, 3000);
    }
  };

  const handleAccount = () => {
    setAccountType(!accountType);
  };

  const validate = () => {
    let inputs = {
      name: state.name,
      email: state.email,
      password: state.password,
      passwordCheck: state.confirmPassword,
    };
    let check = true;
    let errors = {};

    if (!inputs.name) {
      check = false;
      errors["name"] = "Please enter valid name";
    }
    if (!inputs.email) {
      check = false;
      errors["email"] = "Please enter your email";
    }
    if (!inputs.password) {
      check = false;
      errors["password"] = "Please enter your password";
    }
    if (!inputs.passwordCheck) {
      check = false;
      errors["confirmPassword"] = "Please confirm your password";
    }

    if (inputs.password !== inputs.passwordCheck) {
      check = false;
      errors["password"] = "Passwords don't match";
    }

    setErrors(errors);

    return check;
  };

  return (
    <div>
      {status && console.log(status)}
      <form className="switch-set">
        <div className="account-type">Account Type</div>
        <input
          type="radio"
          id="switch_left"
          name="switchToggle"
          value="Client"
          onChange={handleAccount}
          checked={!accountType}
        />
        <label htmlFor="switch_left">Client</label>

        <input
          type="radio"
          id="switch_right"
          name="switchToggle"
          value="Clinic"
          onChange={handleAccount}
          checked={accountType}
        />
        <label htmlFor="switch_right">Clinic</label>
      </form>

      <form
        className="signup-form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              id="name"
              value={state.name}
              onChange={handleChange}
            />
          </label>
          <div className="field-error">{errors.name}</div>
        </div>

        <div>
          <label>
            Email:
            <input
              type="text"
              name="email"
              id="email"
              value={state.email}
              onChange={handleChange}
            />
          </label>
          <div className="field-error">{errors.email}</div>
        </div>

        <br />
        <div>
          <label>
            Password:
            <input
              type="text"
              name="password"
              id="password"
              value={state.password}
              onChange={handleChange}
            />
          </label>
          <div className="field-error">{errors.password}</div>
        </div>

        <div>
          <label>
            Confirm Password:
            <input
              type="text"
              name="confirmPassword"
              id="confirmPassword"
              value={state.confirmPassword}
              onChange={handleChange}
            />
          </label>
          <div className="field-error">{errors.confirmPassword}</div>
        </div>
        <br />
        <input type="submit" value="Submit" />
      </form>

      <p>
        Aleady have an account? <br />
      </p>
    </div>
  );
}
// Create a link to allow someone to login instead of signing up

export default SignUpForm;
