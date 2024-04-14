import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import Logout from "./Logout";

const Welcome = ({currentUser}) => {
    return (
        <Container>
            <div className="logoutButton"><Logout /></div>
            <img src={Robot} alt="Robot" />
            <h1>Hello, <span>{currentUser.username}</span>!</h1>
            <h2>Welcome to PineCHAT</h2>
        </Container>
    );
}
export default Welcome; 
const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    color: white;
    .logoutButton{
        position: absolute;
        top: 1rem;
        right: 1rem;
    }
    span{
        color: #f8bb23;
    }
    img{
        height: 20rem;
    }
`;