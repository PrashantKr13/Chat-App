import React from "react";
import styled from "styled-components";
import Contacts from "../components/Contacts";
import { allUserRoute } from "../utils/APIRoutes";
import axios from "axios";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

export default function Chat(){
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(()=>{
        (async()=>{
            if(!localStorage.getItem("chat-app-user")){
                navigate("/login");
            }else{
                setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
                setIsLoaded(true);
            }
        })()
    },[])
    useEffect(()=>{
        (async()=>{
            if(currentUser){
                if(currentUser.isAvatarImageSet){
                    const data = await axios.get(`${allUserRoute}/${currentUser._id}`);
                    setContacts(data.data);
                }else{
                    navigate("/setavatar");
                }
            }
        })()
    },[currentUser])
    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    } 
    return <Container>
        <div className="container">
             <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
             {
                isLoaded && currentChat===undefined?
                <Welcome currentUser={currentUser}/>:
                <ChatContainer currentChat={currentChat}/>
            }
        </div>
    </Container>
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    background-color: #131324;
    .container{
        background-color: #00000076;
        height: 85vh;
        width: 85vw;
        display: grid;
        grid-template-columns: 25% 75%;
    }
`;