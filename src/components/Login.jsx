import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constansts";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true },
      );
      // console.log(res?.data?.data);
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (err) {
      console.dir(err);
    }
  };

  const handleLogin = async () => {
    // console.log("handleLogin clicked !");

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      // console.dir(err);
      setError(err.response?.data || "Something went wrong");
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-100 w-96">
        <div className="card-body">
          <h2 className="card-title flex justify-center">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <div>
            {!isLogin && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name : </legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">LastName : </legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </>
            )}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email : </legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password : </legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p className="font-light text-sm text-red-700">{error}</p>
          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-primary"
              onClick={isLogin ? handleLogin : handleSignup}
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </div>
          {isLogin ? (
            <p className="text-lg text-center mt-4">
              New user ?{" "}
              <span
                className="text-primary cursor-pointer hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Register here
              </span>
            </p>
          ) : (
            <p className="text-lg text-center mt-4">
              Already a user ?{" "}
              <span
                className="text-primary cursor-pointer hover:underline"
                onClick={() => setIsLogin(true)}
              >
                login
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
