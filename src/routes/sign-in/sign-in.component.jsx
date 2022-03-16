import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import Button from "../../components/button/button.component";
const SignIn = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    const userRef = await createUserDocumentFromAuth(response.user);
    console.log(userRef);
  };

  return (
    <div>
      <h1>Sign in page</h1>
      <Button onClick={logGoogleUser}> Sign in with google </Button>
      <SignUpForm />
    </div>
  );
};
export default SignIn;
