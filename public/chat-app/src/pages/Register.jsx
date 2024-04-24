import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../assets/logoim.png";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmpassword: ""
    });
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    };
    useEffect(()=>{
        if(localStorage.getItem("chat-app-user")){
            navigate("/");
        }
    },[])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { username, email, password } = values;
            const { data } = await axios.post(registerRoute, {
                username, email, password
            });
            if(data.status === false){
                toast.error(data.msg, toastOptions);
            }if(data.status === true){
                console.log(`data.user=${data.user}`);
                localStorage.setItem("chat-app-user", JSON.stringify(data.newUser));
                navigate("/");
            }
        }
    }
    const handleValidation = () => {
        const { password, confirmpassword, email, username } = values;
        if (password !== confirmpassword) {
            toast.error("password and confirm password should be the same.", toastOptions);
            return false;
        }
        else if (username.length < 4) {
            toast.error("username must have atleast 4 characters", toastOptions);
            return false;
        }
        else if (password.length < 8) {
            toast.error("Password must have atleast 8 characters", toastOptions);
            return false;
        }
        else if (email === "") {
            toast.error("Email is required.", toastOptions);
            return false;
        } return true;
    }
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return <>
        <FormContainer>
            <form onSubmit={(event) =>  handleSubmit(event) }>
                <div className="brand">
                    <img src={Logo} alt="logo image" />
                    <h1>PineCHAT</h1>
                </div>
                <input type="text" name="username" placeholder="Username" onChange={(e) => handleChange(e)} />
                <input type="text" name="email" placeholder="E-mail" onChange={(e) => handleChange(e)} />
                <input type="password" name="password" placeholder="Password" onChange={(e) => handleChange(e)} />
                <input type="password" name="confirmpassword" placeholder="Confirm Password" onChange={(e) => handleChange(e)} />
                <button type="submit">Create User</button>
                <span>
                    Already have an account?<Link to='/login'>Login</Link>
                </span>
            </form>
            <ToastContainer />
        </FormContainer>
    </>
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background-color: black;
    color: white;
    img{
        height: 5rem
    }
    .brand{
        display: flex;
        align-items: end;
        justify-content: center;
        gap: 1rem;
        h1{
            color: #f8bb23;
        }
    }
    form{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #151515;
        padding: 3rem 5rem;
        border-radius: 2rem;
    }
    input{
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #fe9f03;
        border-radius: 0.4rem;
        width: 100%;
        color: white;
        font-size: 1rem;
        letter-spacing: 0.2rem;
    &:focus{
        border: 0.1rem solid #fe5103;
        outline: none;
    }
}
    button{
        background-color: #fe9f03;
        color: white;
        padding: 1rem 2rem;
        border: none;
        border-radius: 0.4rem;
        cursor: pointer;
        font-weight: bold;
        font-size: 1rem;
        text-transform: uppercase;
        transition: 0.5s ease-in-out;
        &:hover{
            background-color: #fe5103;
        }
    }
    span{
        color: white;
        text-transform: uppercase;
        a{
            color: #f8bc23;
            text-decoration: none;
        }
    }
`;