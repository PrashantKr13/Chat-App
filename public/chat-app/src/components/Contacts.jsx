import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logoim.png";

const Contacts = ({contacts, currentUser, changeChat}) => {
    
    const [currentUsername, setCurrentUsername] = useState(undefined);
    const [currentUserAvatar, setCurrentUserAvatar] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
 
    useEffect(()=>{
        if(currentUser){
            setCurrentUsername(currentUser.username);
            setCurrentUserAvatar(currentUser.avatarImage);
        }
    },[contacts]) 

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    }
    return <>
        {
            currentUserAvatar && currentUsername && (
                <Container>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h3>PINETALK</h3>
                    </div>
                    <div className="contacts">
                        {
                            contacts.map((contact, index)=>{
                                return (
                                    <div key={index} className={`contact ${index===currentSelected?"selected":""}`} onClick={()=>changeCurrentChat(index, contact)} >  
                                        <div className="avatar">
                                            <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="Avatar" />
                                        </div>
                                        <div className="username"><h3>{contact.username}</h3></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="currentUser">
                        <div className="avatar">
                            <img src={`data:image/svg+xml;base64,${currentUser.avatarImage}`} alt="" />
                        </div>
                        <div className="username">
                            <h2>{currentUser.username}</h2>
                        </div>
                    </div>
                </Container>
            )
        }
    </>
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 12% 75% 13%;
    overflow: hidden;
    background-color: #080420;
    .brand{
        display: flex;
        justify-content: center;
        align-items: end;
        margin-bottom: 0.5rem;
        gap: 0.5rem;
        img{
            height: 3.5rem;
        }
        h3{
            color: #f8bb23;
            text-transform: uppercase;
        }
    }
    .contacts{
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        &::-webkit-scrollbar{
            width: 0.2rem; 
        &-thumb{
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 0.1rem;
        }
    }
        .contact{
            display: flex; 
            align-items: center;
            min-height: 4rem;
            width: 90%;
            cursor: pointer;
            border-radius: 0.2rem;
            gap: 1rem;
            padding: 0.4rem;
            background-color: #ffffff39;
            color: #f8bb23;
            transition: 0.5s ease-in-out;
            img{
                height: 3rem;
            }
        }
        .username{
            color: white;
        }
        .selected{
            background-color: #fe5103;
        }
    }
    .currentUser{
        background-color: #0d0d30;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        .avatar{
            img{
                height: 4rem;
                max-inline-size: 100%;
            }
        }
        .username{
            h2{
                color: white;
            }
        }
    }
`;

export default Contacts;
