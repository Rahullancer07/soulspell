import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const successNotify = () => toast("Welcome to the SoulSpell");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });
      if(res && res.data.success){
          successNotify();
          navigate('/'); // navigate to home page
      }
      else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to register");
    }
  };
  return (
    <div className="flex items-center justify-center w-full h-fit pt-20 pb-60">
      <div className="flex flex-col items-center justify-center min-w-fit min-h-fit">
        <span className="uppercase font-medium tracking-widest text-3xl">
          Register
        </span>
        <span className="mt-7">Please fill the information below:</span>
        <div className="mt-5 w-full">
          <form className="flex flex-col w-96 gap-3" onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full h-10 border border-slate-300 px-5 placeholder:text-black "
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              className="w-full h-10 border border-slate-300 px-5 placeholder:text-black "
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
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
              value="Create my account"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
