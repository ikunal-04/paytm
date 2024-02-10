import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import {Input} from "../components/Input";
import {Button} from "../components/Button";
import {BottomWarning} from "../components/BottomWarning";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signin(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="bg-slate-300 flex justify-center h-screen">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-96 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"}/>
                    <SubHeading sub_heading={"Enter your information to sign in."}/>
                    <form>
                        <Input label={"Email"} placeholder="john@example.com" onChange={e => {
                            setEmail(e.target.value);
                            }}/>
                        <Input label={"Password"} placeholder="123456" onChange={e => {
                            setPassword(e.target.value);
                        }}/>
                        <div className="mt-4">
                            <Button children={"Sign in"} onClick={ async () => {
                                const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                                    email,
                                    password
                                });
                                console.log(response.data.token)
                                localStorage.setItem("token", response.data.token);
                                navigate("/dashboard");
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