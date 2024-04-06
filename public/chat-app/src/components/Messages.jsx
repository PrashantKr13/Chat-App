import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import axios from "axios";
import { getMessagesRoute } from "../utils/APIRoutes";


export default function Messages ({currentChat, currentUser}) {
    const [messages, setMessages] = useState([]);
    useEffect(()=>{
        (async()=>{
            const response = await axios.post(getMessagesRoute, {
                from: currentChat._id,
                to: currentUser._id
            })
            setMessages(response.data);
        })()
    }, [currentChat, messages]);



    return (
        <Container>
            {
                messages.map((msg, index)=>{
                    return (
                        <div key={index} className={`message ${msg.fromSelf ? "sended":"received"}`}>{msg.message}</div>
                    )
                })
            }
        </Container>
    );
}

const Container = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: start;
    max-height: 70vh;
    overflow: auto;
    &::-webkit-scrollbar{
        width: 0.2rem;
    &-thumb{
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 0.1rem;
    }
}
    .message{
        background-color: #fe5103;
        padding: 0.4rem 1rem;
        margin: 0.5rem 2rem;
        font-size: 1.5rem;
        border-radius: 1.5rem;
        max-width: 40%;
        overflow-wrap: break-word;
    }
    .sended{
        align-self: end;
        background-color: #9a86f3;
        color: white;
    }
    .received{
        align-self: start;
    }
`;