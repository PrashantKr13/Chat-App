import React from "react";
import styled from "styled-components";
import Logo from "../assets/logoim.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { loginRoute } from "../utils/APIRoutes";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    };
    const [values, setValues] = useState({
        username: "",
        password: ""
    });
    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate("/");
        }
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { username, password } = values;
            const { data } = await axios.post(loginRoute, {
                username, password
            });
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            else if (data.status === true) {
                localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                navigate("/");
            }
        }
    }
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleValidation = () => {
        const { username, password } = values;
        if (username === "") {
            toast.error("Username is required.", toastOptions);
            return false;
        }
        else if (password === "") {
            toast.error("Password is required.", toastOptions);
            return false;
        }
        return true;
    }

    return <><FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
            <div className="brand">
                <img src={Logo} alt="logo Image" />
                <h1>PineCHAT</h1>
            </div>
            <input type="text" name="username" placeholder="Username" onChange={(e) => handleChange(e)} />
            <input type="password" name="password" placeholder="Password" onChange={(e) => handleChange(e)} />
            <button type="submit">LOGIN</button>
            <span>Don't have an Account?<Link to="/register">Register</Link></span>
        </form>
    </FormContainer>
        <ToastContainer />
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