import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Passwordinput from "../../Components/PasswordInput/Passwordinput";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utlis/helper";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();

    if(!name){
      setError("Please enter your name");
      return;
    }

    if(!validateEmail(email)){
      setError('Please enter a valid email address.');
      return;
    }

    if(!password){
      setError('Please enter a password.');
      return;
    }

    setError("");

    // Signup API call

  };

  return (
    <>
      <Navbar />
      <div className="flex item-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignup}>
            <h4 className="text-2xl mb-7">SignUp</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Passwordinput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Create Account
            </button>
            <p className=" text-sm text-center mt-4">
               Already have Account ?{" "}
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
