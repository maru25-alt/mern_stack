import React, { useState } from "react";
import "./signup.css";

function SignupForm() {
  const [accountType, setAccountType] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async () => {};

  const handleAccount = () => {
    setAccountType(!accountType);
  };

  const validate = () => {
    let check = false;
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
      <form className="signup-form" noValidate autoComplete="off">
        <label>
          Name:
          <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input
            type="text"
            name="name"
            value={password.password}
            onChange={(e) =>
              setPassword((prevPassword) => {
                return { ...prevPassword, password: e.target.value };
              })
            }
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="text"
            name="name"
            value={password.confirmPassword}
            onChange={(e) =>
              setPassword((prevPassword) => {
                return { ...prevPassword, confirmPassword: e.target.value };
              })
            }
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>

      <p>
        Aleady have an account? <br />
        <a href="/">Log in here</a>
      </p>
    </div>
  );
}

export default SignupForm;
