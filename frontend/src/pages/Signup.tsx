import React, { useRef, type FormEvent } from "react"
import Button from "../components/Button"
import { Heading } from "../components/Heading"
import { Heading2 } from "../components/Heading2"
import InputBox from "../components/InputBox"
import Links from "../components/Links"
import api from "../api"
import { useAuth } from "../context/AuthContext"
import { Navigate, useNavigate } from "react-router-dom"

interface SignupResponse {
  accessToken: string;
  userId: string;
  message?: string;
}


function Signup() {
  const navigate = useNavigate()
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const { signin } = useAuth()


  const handleSignup = async () => {


    const signupData = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
      firstName: firstNameRef.current?.value,
      lastName: lastNameRef.current?.value
    }

    try {
      const response = await api.post<SignupResponse>('/user/signup', signupData);
      const { accessToken, userId } = response.data

      signin(accessToken, userId)



      alert('Account created')
      navigate("/account/dashboard")
    } catch (error: any) {

      const errorMsg = error.response?.data?.message || 'signup failed';
      console.log("Error:", errorMsg);

    }


  }

  return (
    <div className="bg-purple-100 w-screen h-screen flex justify-center items-center">
      <div className="bg-white max-w-110 p-4 rounded-md max-h-200">
        <div className="flex flex-col ">
          <Heading label="Create Account" />
          <Heading2 label="Start using your payment wallet in seconds" type="open" />
        </div>
        <div className="mb-2 mt-4">

          <Heading2 label="First name " type="related" />
          <InputBox ref={firstNameRef} placeholder="Enter you name" />
          <Heading2 label="Last name " type="related" />
          <InputBox ref={lastNameRef} placeholder="Enter you Last name" />
          <Heading2 label="Username " type="related" />
          <InputBox ref={usernameRef} placeholder="Enter you username" />
          <Heading2 label="Password" type="related" />
          <InputBox ref={passwordRef} placeholder="Enter you Password" />
        </div>
        <Button onClick={handleSignup} label="Create account" variant="primary" />
        <div className="flex justify-center items-center mt-3 ">
          <Heading2 label="Already registered?" type="open" />
          <Links text="Sign in" />
        </div>
      </div>
    </div>
  )
}

export default Signup