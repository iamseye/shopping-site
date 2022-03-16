import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleChnage = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      console.log("User creation encountered an error ", error.message);
    }
  };

  return (
    <div>
      <h1>Sign Up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input
          type="text"
          required
          name="displayName"
          value={displayName}
          onChange={handleChnage}
        ></input>

        <label>Email</label>
        <input
          typet="email"
          required
          name="email"
          value={email}
          onChange={handleChnage}
        ></input>

        <label>Password</label>
        <input
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChnage}
        ></input>

        <label>Confirm Password</label>
        <input
          type="password"
          required
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChnage}
        ></input>

        <button type="submit"> Sign Up </button>
      </form>
    </div>
  );
};
export default SignUpForm;
