import React, {useState} from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import {IoMdSend} from "react-icons/io";
import {BsEmojiSmileFill} from "react-icons/bs";

const ChatInput = React.forwardRef(({handleSendMsg}, ref) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiClick = (Emoji) => {
    setMsg(prevMsg => prevMsg+Emoji.emoji);
  }

  const handleEmojiPickerShowHide = () => {
    setShowEmojiPicker(!showEmojiPicker);
  }

  const handleMessageChange = (e) => {
    setMsg(e.target.value);
  }

  const sendChat = (e) => {
    e.preventDefault();
    if(msg.length>0){
      handleSendMsg(msg);
      setMsg("");
    }
  }
    return (
        <Container>
            <div ref={ref} className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerShowHide}/>
                    {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>}
                </div>
            </div>
            <form className="input-container" onSubmit={(e)=>sendChat(e)}>
                <input id="inputfield" type="text" placeholder="Type your message here" value={msg} onChange={handleMessageChange}/>
                <button className="submit"><IoMdSend/></button>
            </form>
        </Container>
    )
})

export default ChatInput;

const Container = styled.div`
display: grid;
align-items: center;
grid-template-columns: 5% 95%;
background-color: #080420;
padding: 0 2rem;
@media only screen and (max-width: 1000px) {
  .emoji{
    right: 18px
  }
}
.button-container {
  display: flex;
  align-items: center;
  color: white;
  gap: 1rem;
  .emoji {
    position: relative;
    svg {
      font-size: 1.5rem;
      color: #ffff00c8;
      cursor: pointer;
    }
    .EmojiPickerReact {
      position: absolute;
      top: -480px;
      background-color: #080420;
      box-shadow: 0 5px 10px #9a86f3;
      border-color: #9a86f3;
      ::-webkit-scrollbar {
        background-color: #080420;
        width: 5px;
        &-thumb {
          background-color: #9a86f3;
        }
      }
      .epr-category-nav {
        button {
          filter: contrast(1);
          border: none;
        }
      }
      .epr-search-container {
        input{
          background-color: transparent;
          border-color: #9a86f3;
        }
      }
      .epr-emoji-category-label{
        background-color: #080420;
      }
    }
  }
}
.input-container {
  width: 100%;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  background-color: #ffffff34;
  input {
    width: 90%;
    height: 60%;
    background-color: transparent;
    color: white;
    border: none;
    padding-left: 1rem;
    font-size: 1.2rem;

    &::selection {
      background-color: #9a86f3;
    }
    &:focus {
      outline: none;
    }
  }
  button {
    padding: 0.3rem 2rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #9a86f3;
    border: none;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      padding: 0.3rem 1rem;
      svg {
        font-size: 0.5rem;
      }
    }
    svg {
      font-size: 2rem;
      color: white;
    }
  }
}
`;