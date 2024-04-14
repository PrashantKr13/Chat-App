import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import axios from "axios";
import { addMessageRoute, getMessagesRoute } from "../utils/APIRoutes";
import {v4 as uuidv4} from "uuid";

const ChatContainer = React.forwardRef(({currentChat, currentUser, socket}, ref) => {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();
    const [sent, setSent] = useState(false);
    
    useEffect(()=>{
        if(currentChat){(async()=>{
            const data = await JSON.parse(
                localStorage.getItem("chat-app-user")
              );
              const response = await axios.post(getMessagesRoute, {
                from: data._id,
                to: currentChat._id,
              });
              setMessages(response.data);
        })()}
    }, [currentChat, sent]);
    const handleSendMsg = async (msg) => {
        const data = await JSON.parse(
            localStorage.getItem("chat-app-user")
          );
        await axios.post(addMessageRoute, {
            from: data._id,
            to: currentChat._id,
            message: msg,
        });
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: currentUser._id,
            message: msg
        });

        const msgs = [...messages];
        msgs.push({fromSelf: true, msg: msg});
        setMessages(msgs);
        setSent(!sent);
    }
    useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-receive", (msg)=>{
                setArrivalMessage({
                    fromSelf: false, message: msg
                })
            })
        }
    },[])
    useEffect(()=>{
        arrivalMessage && setMessages((prev)=>[...prev, arrivalMessage]);
    },[arrivalMessage])
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({behavior: "smooth"})
        }
    }, [messages]);
    return (<>
        {currentChat && (<Container>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="" />
                    </div>
                    <div className="username">
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
                <Logout/>
            </div>
            <div className="messages">
            {
                messages.map((msg, index)=>{
                    return (
                        <div key={uuidv4()} ref={scrollRef} className={`message ${msg.fromSelf ? "sended":"received"}`}>{msg.message}</div>
                    )
                })
            }
        </div>
            <ChatInput ref={ref} handleSendMsg={handleSendMsg} />
        </Container>)}
        </>  
    )
})

export default ChatContainer;

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 80% 10%;
    @media only screen and (max-width: 1000px){
        min-height: 100%;
        .messages{
            max-height: 90vh !important;
        }
    }
    .messages{
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
    }
    .chat-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem;
        .user-details{
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar{
                img{
                    height: 3rem;
                }
            }
            .username{
                h3{
                    color: white;
                }
            }
        }
    }
`;