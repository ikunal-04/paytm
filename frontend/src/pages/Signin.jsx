import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import {Input} from "../components/Input";
import {Button} from "../components/Button";
import {BottomWarning} from "../components/BottomWarning";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signin(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handlelogin = async (e) => {
        e.prevent.default();
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username,
                password,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard')
        } catch (error) {
            console.log(error.response.data.error);
        }
    }

    return (
        <div className="bg-slate-300 flex justify-center h-screen">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-96 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"}/>
                    <SubHeading sub_heading={"Enter your information to sign in."}/>
                    <form onSubmit={handlelogin}>
                        <Input label={"Email"} placeholder="john@example.com" onChange={e => {
                            setUsername(e.target.value);
                            }}/>
                        <Input label={"Password"} placeholder="123456" onChange={e => {
                            setPassword(e.target.value);
                        }}/>
                        <div className="mt-4">
                            <Button children={"Sign in"} onClick={() => {
                                console.log("nav to dashboard");
                                navigate("/dashboard")
                            }}/>
                        </div>
                    </form>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>
                </div>
            </div>
        </div>
    )
}

export default Signin;