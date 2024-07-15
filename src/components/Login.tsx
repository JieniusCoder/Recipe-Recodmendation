import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

const Login = () => {
  const responseMessage = (response: any) => {
    console.log(response);
  };
  const errorMessage = (error: void) => {
    console.log(error);
  };
  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    </div>
  );
};

export default Login;
