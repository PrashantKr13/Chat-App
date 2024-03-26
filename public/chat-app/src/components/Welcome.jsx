import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

const Welcome = ({currentUser}) => {
    return (
        <Container>
            <img src={Robot} alt="Robot" />
            <h1>Hello, <span>{currentUser.username}</span>!</h1>
            <h2>Welcome to PINETALK</h2>
        </Container>
    );
}
export default Welcome; 
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    color: white;
    span{
        color: #f8bb23;
    }
    img{
        height: 20rem;
    }
`;