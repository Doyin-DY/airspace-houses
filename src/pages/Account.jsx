import React, { useEffect, useState } from "react";
import { estate_keys } from "../assets/images";
import { BsEnvelopePaper, BsPerson, BsPersonAdd } from "react-icons/bs";
import PhoneInput from "react-phone-number-input";
import flag from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";
import flags from "react-phone-number-input/flags";
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../features/slices/userSlice";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const dispatch = useDispatch()
  const navigate = useNavigate() 
  const [showLogin, setShowLogin] = useState(true)
  const [signupInputs, setSignupInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confPassword: "",
    image: "",
  })
  const [loginInputs, setLoginInputs] = useState({
    email: "",
    password: ""
  })
  const handleChange = e => {
    setSignupInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleUpload = async(e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    const image = await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result)
      reader.onerror = err => reject(err)
    })
    setSignupInputs(prev => ({...prev, image}))
  }
  const handleLoginChange = e => {
    setLoginInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleSignup = async (e) => {
    e.preventDefault();
    if (signupInputs.confPassword !== signupInputs.password) {
      toast.error("Passwords do NOT match", { id: "123" })
    }
    else if (signupInputs.phone.length !== 14) {
      toast.error("Invalid Phone Number Supplied", { id: "123" })
    }
    else {
      toast.loading("Please wait for account creation...", { id: "123" })
      try {
        const sendRequest = await fetch('http://localhost:3000/api/auth/signup', {
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST",
          credentials: "include",
          body: JSON.stringify(signupInputs)
        })
        const res = await sendRequest.json()
        if (res.error) toast.error(res.message, { id: "123" })
        toast.success(res.message, { id: "123" })
      } catch (error) {
        console.log({ error })
        toast.error(error.message, { id: "123" })
      }
    }
  }
  const userState = useSelector(state => state.user)
  useEffect(() => {
    if (userState) navigate("/dashboard")
      //eslint-disable-next-line
  }, [userState])

  const handleLogin = async (e) => {
    e.preventDefault();
    toast.loading("Please wait for while we log you in...", { id: "123" })
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(loginInputs)
      })
      const data = await res.json()
      if (data.error) toast.error(data.message, { id: "123" });
      else {
        dispatch(updateUser(data.user))
        toast.success(data.message, { id: "123" })
        setTimeout(() => {
          navigate(0)
        }, 1500)
      }
    } catch (error) {
      toast.error(error.message, { id: "123" })
    }
  }
  return (
    <main className="flex flex-col relative">
      <div className="bg-main relative min-h-[65vh] h-[70vh] px-4">
        <img
          src={estate_keys}
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative py-10 container mx-auto text-white flex flex-col justify-center h-full gap-2">
          <h3 className="text-3xl md:text-4xl font-bold">
            Login/Signup
          </h3>
          <p className="text-base md:text-lg">
            Having an account gives you tremendous access to more!
          </p>
        </div>
      </div>

      <div className="relative p-6 -mt-10 md-20 z-20">
        {
          showLogin ?
            <form onSubmit={handleLogin} className="bg-white container mx-auto shad p-5 rounded-lg grid md:grid-cols-1 w-full max-w-screen-sm gap-4 ">
              <div className="flex items-center gap-4 md:col-span-1">
                <div className="bg-orange-400 rounded-full h-10 w-10 grid place-items-center text-main text-xl md:text-3xl md:h-16 md:w-16">
                  <BsPerson />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-main">
                  Login to Continue
                </h3>
              </div>
              <input
                type="email"
                name="email"
                value={loginInputs.email}
                onChange={handleLoginChange}
                placeholder="michaelbrentford@email.com"
                required
                className="rounded-md border-2 border-slate-200 py-2 px-4 text-small md-text-base outline-none hover:border-main"
              />
              <input
                type="password"
                name="password"
                value={loginInputs.password}
                onChange={handleLoginChange}
                placeholder="********"
                minLength={8}
                required
                className="rounded-md border-2 border-slate-200 py-2 px-4 text-small md-text-base outline-none hover:border-main"
              />
              <button
                type="submit"
                className=" rounded-full py-2 px-8 text-small md-text-base outline-none w-full bg-main text-white"
              >
                Login
              </button>
              <p onClick={() => setShowLogin(!showLogin)} className="text-sm text-center text-slate-400 cursor-pointer p-2">Don't have an account yet? Signup</p>
            </form>
            :
            <form onSubmit={handleSignup} className="bg-white container mx-auto shad p-5 rounded-lg grid md:grid-cols-2 w-full max-w-screen-md gap md:gap-5">
              <div className="flex items-center gap-4 md:col-span-2">
                <div className="bg-orange-400 rounded-full h-10 w-10 grid place-items-center text-main text-xl md:text-3xl md:h-16 md:w-16">
                  <BsPersonAdd />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-main">
                  Create an Account to get Started
                </h3>
              </div>
              <input
                type="text"
                name="firstname"
                value={signupInputs.firstname}
                onChange={handleChange}
                placeholder="michael"
                required
                className="rounded-md border-2 border-slate-200 py-2 px-4 text-sm md-text-base outline-none hover:border-main"
              />
              <input
                type="text"
                name="lastname"
                value={signupInputs.lastname}
                onChange={handleChange}
                placeholder="Brentford"
                required
                className="rounded-md border-2 border-slate-200 py-2 px-4 text-small md-text-base outline-none hover:border-main"
              />
              <input
                type="email"
                name="email"
                value={signupInputs.email}
                onChange={handleChange}
                placeholder="michaelbrentford@email.com"
                required
                className="rounded-md border-2 border-slate-200 py-2 px-4 text-small md-text-base outline-none hover:border-main"
              />
              <div className="rounded-md border-2 border-slate-200 py-2 px-4 text-small md-text-base outline-none hover:border-main">
                <PhoneInput
                  flags={flags}
                  defaultCountry="NG"
                  international
                  onChange={(value) => setSignupInputs(prev => ({ ...prev, phone: value }))}
                  value={signupInputs.phone}
                  className="outline-none border-none"
                />
              </div>
              <input
                type="password"
                name="password"
                value={signupInputs.password}
                onChange={handleChange}
                placeholder="********"
                minLength={8}
                required
                className="rounded-md border-2 border-slate-200 py-2 px-4 text-small md-text-base outline-none hover:border-main"
              />
              <input
                type="password"
                name="confPassword"
                value={signupInputs.confPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                minLength={8}
                required
                className="rounded-md border-2 border-slate-200 py-2 px-4 text-small md-text-base outline-none hover:border-main"
              />
              <input multiple type="file" onChange={handleUpload} name="images" accept=".jpg, .jpeg, .png" className="border-dotted rounded-md border-2 border-yellow py-6 px-4 text-sm md:text-base outline-none hover:border-main md:col-span-2 cursor-pointer" />
              <p onClick={() => setShowLogin(!showLogin)} className="text-sm text-center text-slate-400 cursor-pointer p-2">Have an Account already? Login</p>
              <button
                type="submit"
                className=" rounded-full w-max  py-2 px-4 text-small md-text-base outline-none bg-main text-white"
              >
                Create Account
              </button>
            </form>

        }
      </div>
    </main>
  );
}
