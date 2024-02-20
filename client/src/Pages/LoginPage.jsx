import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/auth.context";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const successNotify = () => toast("Welcome Back to the SoulSpell");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        successNotify();
        setAuth({
            ...auth,
            user : res.data.user,
            token : res.data.token,
        })
        // storing the data in local storage 
        localStorage.setItem("auth", JSON.stringify(res.data))
        navigate("/"); // navigate to home page
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to login");
    }
  };
  return (
    <div className="flex items-center justify-center w-full h-fit pt-20 pb-60">
      <div className="flex flex-col items-center justify-center min-w-fit min-h-fit">
        <span className="uppercase font-medium tracking-widest text-3xl">
          Login
        </span>
        <span className="mt-7">Please enter your email and password:</span>
        <div className="mt-5 w-full">
          <form className="flex flex-col w-96 gap-3" onSubmit={handleSubmit}>
            <input
              type="email"
              className="w-full h-10 border border-slate-300 px-5 placeholder:text-black "
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="w-full h-10 border border-slate-300 px-5 placeholder:text-black "
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="submit"
              className="w-full h-10 border border-slate-500 bg-black text-white px-5 placeholder:text-black uppercase text-sm tracking-widest hover:bg-white hover:text-black"
              value="Login"
            />
          </form>
          <Link to="/register">
            <span className="cursor-pointer flex items-center justify-center mt-3">Don't have an account? Create one </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
