import { useContext, useRef } from "react"
import Button from "../components/Button"
import { Heading } from "../components/Heading"
import { Heading2 } from "../components/Heading2"
import InputBox from "../components/InputBox"
import Links from "../components/Links"
import api from "../api"
import { useAuth } from "../context/AuthContext"

interface SignupResponse {
    accessToken: string;
    userId: string,
    message?: string
}

function Signin() {
    const { signin } = useAuth()
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSignin = async () => {

        const signinData = {
            username: usernameRef.current?.value,
            password: passwordRef.current?.value
        }

        try {
            const response = await api.post<SignupResponse>("/user/signin", signinData);
            const { accessToken, userId } = response.data

            signin(accessToken, userId);

            alert("You're Signed in")
        } catch (error: any) {
            console.log("Error:", error);

        }

    }


    return (
        <div className="bg-purple-100 w-screen h-screen flex justify-center items-center">
            <div className="bg-white max-w-110 p-4 rounded-md max-h-200">
                <div className="flex flex-col ">
                    <Heading label="Signin" />
                    <Heading2 label="Start using your payment wallet in seconds" type="open" />
                </div>
                <div className="mb-2 mt-4">

                    <Heading2 label="Username " type="related" />
                    <InputBox ref={usernameRef} placeholder="Enter you username" />
                    <Heading2 label="Password" type="related" />
                    <InputBox ref={passwordRef} placeholder="Enter you Password" />
                </div>
                <Button onClick={handleSignin} label="Login" variant="primary" />
                <div className="flex justify-center items-center mt-3 ">
                    <Heading2 label="Don't have an account?" type="open" />
                    <Links text="Sign up" />
                </div>
            </div>
        </div>
    )
}

export default Signin;