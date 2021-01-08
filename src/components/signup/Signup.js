import React, { useState } from "react";
import "./signup.css";

function SignUpForm() {
  const [accountType, setAccountType] = useState(false);
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [clinicAcc, setClinicAcc] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });
  const [clientAcc, setClientAcc] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    if (accountType) {
      setClientAcc((prevState) => {});
    }
  };

  const handleAccount = () => {
    setAccountType(!accountType);
  };

  const clinicForm = () => {
    /* What need's to be in the forms? */
    return <form className="signup-form" noValidate autoComplete="off"></form>;
  };

  const clientForm = () => {
    return <form className="signup-form" noValidate autoComplete="off"></form>;
  };

  return (
    <div>
      <form className="switch-set">
        <div className="account-type">Account Type</div>
        <input
          type="radio"
          id="switch_left"
          name="switchToggle"
          value="Client"
          onChange={handleAccount}
          checked={accountType}
        />
        <label htmlFor="switch_left">Client</label>

        <input
          type="radio"
          id="switch_right"
          name="switchToggle"
          value="Clinic"
          onChange={handleAccount}
          checked={!accountType}
        />
        <label htmlFor="switch_right">Clinic</label>
      </form>

      {accountType ? clientForm() : clinicForm()}
      <p>
        Aleady have an account? <br />
        <a href="/">Log in here</a>
      </p>
    </div>
  );
}

export default SignUpForm;
