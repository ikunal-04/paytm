import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import {Input} from "../components/Input";
import {Button} from "../components/Button";
import {BottomWarning} from "../components/BottomWarning";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username,
                firstName,
                lastName,
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
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-96 text-center p-2 h-max px-4">
                <Heading label="Sign up"/>
                <SubHeading sub_heading="Enter your information to create an account."/>
                <form onSubmit={handleRegister}>
                    <Input label={"First Name"} placeholder="John" onChange={e => {
                        setFirstName(e.target.value);
                        }}/>
                    <Input label={"Last Name"} placeholder="Doe" onChange={e => {
                        setLastName(e.target.value);
                        }}/>
                    <Input label={"Email"} placeholder="john@example.com" onChange={e => {
                        setUsername(e.target.value);
                        }}/>
                    <Input label={"Password"} placeholder="12345" onChange={e => {
                        setPassword(e.target.value);
                        }}/>
                    <div className="mt-4">
                        <Button children={"Sign up"} onClick={() => {
                            console.log('nav to login');
                            navigate('/dashboard')
                        }}/>
                    </div>
                </form>
                <BottomWarning label={"Already have an account?" }buttonText={"Sign in"} to={"/signin"}/>
                </div>
            </div>
        </div>
    )
}

export default Signup;
