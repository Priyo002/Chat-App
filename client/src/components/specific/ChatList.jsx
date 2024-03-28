import React from 'react'
import { Stack } from '@mui/material'
import ChatItem from '../shared/ChatItem.jsx'
import { bgGradient } from '../../constants/color.js';

const ChatList = ({
    w="100%", 
    chats=[],
    chatId, 
    onlineUsers=[],
    newMeassagesAlert=[
        {
            chatId: "",
            count: 0,
        }
    ],
    handleDeletechat,
}) => {
  return (
    <Stack 
        width={w} 
        direction={"column"}
        overflow={"auto"}
        height={"100%"}
    >
        {chats?.map((data,index) => {
            const {avatar,_id,name,groupChat,members} = data;

            const newMessageAlert = newMeassagesAlert.find(
                ({chatId}) => chatId === _id
            );

            const isOnline = members?.some((member)=> onlineUsers.includes(_id));

            return <ChatItem  
            index={index}
            newMessageAlert = {newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            _id={_id}
            key={_id}
            groupChat={groupChat}
            sameSender = {chatId===_id}
            handleDeleteChat={handleDeletechat}
            />;
        })}
    </Stack>
  );
};

export default ChatList