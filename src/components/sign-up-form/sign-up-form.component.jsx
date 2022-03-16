import { useState } from "react";
import FormInput from "../form-input/form-input.component";

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
        <FormInput
          label="Display Name"
          type="text"
          required
          name="displayName"
          value={displayName}
          onChange={handleChnage}
        ></FormInput>

        <FormInput
          label="Email"
          typet="email"
          required
          name="email"
          value={email}
          onChange={handleChnage}
        ></FormInput>

        <FormInput
          label="Password"
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChnage}
        ></FormInput>

        <FormInput
          label="Confirm Password"
          type="password"
          required
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChnage}
        ></FormInput>

        <button type="submit"> Sign Up </button>
      </form>
    </div>
  );
};
export default SignUpForm;
