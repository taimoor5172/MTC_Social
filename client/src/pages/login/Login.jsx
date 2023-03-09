import { useContext, useRef, useState } from "react";
import "./login.css";
import { loginCall, resetPasswordCall, savePasswordCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const { isFetching, dispatch, userID, token, error, message, savePasswordError } = useContext(AuthContext);
  const [loginHook, setLoginHook] = useState(true);
  const [forgetPasswordSuccessHook, setForgetPasswordSuccessHook] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  const resetPasswordRequest = () => {
    console.log('reset .......')

    resetPasswordCall({ email: email.current.value },
      dispatch
    );
    setForgetPasswordSuccessHook(true)
  };

  const savePasswordRequest = () => {

    if (password.current.value == confirmPassword.current.value) {

      savePasswordCall({ userID: userID, token: token, newPassword: password.current.value }, dispatch);
    }

  };


  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">My Talking Clone</h3>
          <span className="loginDesc">
            Create customized videos on MTC Studio..
          </span>
        </div>
        <div className="loginRight">

          {loginHook ?
            <form className="loginBox" onSubmit={handleClick}>
              <input
                placeholder="Email"
                type="email"
                required
                className="loginInput"
                ref={email}
              />
              <input
                placeholder="Password"
                type="password"
                required
                minLength="6"
                className="loginInput"
                ref={password}
              />
              <button className="loginButton" type="submit" disabled={isFetching}>
                {isFetching ? (
                  <CircularProgress color="white" size="20px" />
                ) : (
                  "Log In"
                )}
              </button>
              <span onClick={() => setLoginHook(false)} className="loginForgot">Forgot Password?</span>
              <button className="loginRegisterButton">
                {false ? (
                  <CircularProgress color="white" size="20px" />
                ) : (
                  "Create a New Account"
                )}
              </button>
            </form>

            :

            !error && forgetPasswordSuccessHook ?

              <>


                <div className="loginBox" >
                  <input
                    placeholder="Enter new Password"
                    type="password"
                    required
                    minLength="6"
                    className="loginInput"
                    ref={password}
                  />
                  <input
                    placeholder="Confirm Password"
                    type="password"
                    required
                    minLength="6"
                    className="loginInput"
                    ref={confirmPassword}
                  />
                  <button className="loginButton" onClick={savePasswordRequest}>
                    Reset Password
                  </button>

                  {savePasswordError ? <div className="error_reset_password">{savePasswordError}</div> : message && <div className="success_message">{message}</div>}

                  <span onClick={() => setLoginHook(true)} className="loginForgot">Back to login</span>
                  <button className="loginRegisterButton">
                    {false ? (
                      <CircularProgress color="white" size="20px" />
                    ) : (
                      "Create a New Account"
                    )}
                  </button>
                </div>
              </>

              :

              <div className="loginBox" >
                <input
                  placeholder="Email"
                  type="email"
                  required
                  className="loginInput"
                  ref={email}
                />
                <button className="loginButton" onClick={resetPasswordRequest}>
                  Send Email
                </button>

                {error ? <div className="error_reset_password">{error}</div> : null}
                <span onClick={() => setLoginHook(true)} className="loginForgot">Back to login</span>
                <button className="loginRegisterButton">
                  {false ? (
                    <CircularProgress color="white" size="20px" />
                  ) : (
                    "Create a New Account"
                  )}
                </button>
              </div>

          }
        </div>
      </div>
    </div>
  );
}
