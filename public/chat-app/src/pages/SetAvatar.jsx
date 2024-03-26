import React from "react";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import Loader from "../assets/loader.gif";
import { useState, useEffect } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faRefresh} from "@fortawesome/free-solid-svg-icons"
import { setAvatarRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";

export const SetAvatar = () => {
    const navigate = useNavigate();
    const api = "https://api.multiavatar.com/45678945";
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }

    useEffect(()=>{
        if(!localStorage.getItem("chat-app-user")){
            navigate("/login");
        }
    }, [])

    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        setIsLoading(true); 
        (async () => {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(`${api}/${Math.random() * 1000}`);
                const buffer = new Buffer.from(image.data);
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        })()
    }, [refresh]);

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOptions);
        }else{
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            console.log(user);
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar],
            });
            if(data.isSet){
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user));
                navigate("/")
            }else{
                toast.error("Error setting avatar. Please try again.", toastOptions);
            }
        }
    };

    return <>
        {isLoading?<Container>
            <img src={Loader} alt="Loading..." />
        </Container>:
        <Container>
            <div className="titleContainer">
                <h1>Pick an Avatar as your profile picture</h1>
            </div>
            <div className="avatars">
                {
                    avatars.map((avatar, index) => {
                        return (
                            <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => setSelectedAvatar(index)} />
                            </div> 
                        )
                    })
                }
            </div>
            <div className="buttons">
                <button onClick={setProfilePicture} className="submit">Set as Avatar</button>
                <button className="refresh" onClick={()=>setRefresh(!refresh)}><FontAwesomeIcon icon={faRefresh} style={{fontSize:"3rem"}} className="refreshIcon"/></button>
            </div>
        </Container>}
        <ToastContainer />
    </>
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    height: 100vh;
    width: 100vw;
    background-color: #131324; 
    .titleContainer{
        h1{
            color: #f8bb23;
        }
    }
    .avatars{
        display: flex;
        justify-conten: center;
        align-items: center;
        gap: 2rem;
        .avatar{
            display: flex;
            align-items: center;
            justify-content: center; 
            border: 0.4rem solid transparent;
            border-radius: 5rem;
            transition: 0.5s ease-in-out;
            img{
                height: 8rem;
            }
        }
        .selected{
            border: 0.4rem solid #fe5103;
        }
    }
    .buttons{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 3rem;
        .submit{
            background-color: #fe9f03;
        color: white;
        padding: 1rem 2rem;
        border: none;
        border-radius: 1rem;
        cursor: pointer;
        font-weight: bold;
        font-size: 1rem;
        text-transform: uppercase;
        transition: 0.5s ease-in-out;
        &:hover{
            background-color: #fe5103;
        }
        }
        .refresh{
            background-color: transparent;
            border: none;
            .refreshIcon{
                color: #fe9f03;
                transition: 0.5s ease-in-out;
                &:hover{
                    color: #fe5103;
                }
            }
        }
    }
`;