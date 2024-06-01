import React,{useCallback, useEffect, useRef,useState} from 'react';
import AppLayout from '../components/layout/AppLayout';
import { IconButton, Skeleton, Stack } from '@mui/material';
import { grayColor, orange } from '../constants/color.js';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponents.jsx';
import FileMenu from '../components/dialogs/FileMenu.jsx';
import MessageComponent from '../components/shared/MessageComponent.jsx'
import { getSocket } from '../socket.jsx';
import { NEW_MESSAGE } from '../constants/events.js';
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api.js';
import { useErrors, useSocketEvents } from '../hooks/hook.jsx';
import { useInfiniteScrollTop } from '6pp';
import { useDispatch } from 'react-redux';
import { setIsFileMenu } from '../redux/reducers/misc.js';


const Chat = ({chatId, user}) => {

  const containerRef = useRef(null);

  const dispatch = useDispatch();

  const [ message, setMessage ] = useState("");
  const [ messages , setMessages ] = useState([]);
  const [ page, setPage ] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const socket = getSocket();

  const chatDetails = useChatDetailsQuery({chatId,skip: !chatId});

  const oldMessagesChunk = useGetMessagesQuery({chatId,page});

  const { data: oldMessages , setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk?.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages,
  );

  const members = chatDetails?.data?.chat?.members;

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if(!message.trim()) return;

    //Emmiting the message to the server
    socket.emit(NEW_MESSAGE, {chatId,members,message});

    setMessage("");

  }

  const newMessageHandler = useCallback((data) => {
    console.log(data);
    setMessages((prev) => [...prev,data.message]);
  },[]);

  const errors = [
    {isError: chatDetails.isError, error: chatDetails.error},
    {isError: oldMessagesChunk.isError, error: oldMessagesChunk.error}
  ];

  const eventHandler = {
    [NEW_MESSAGE]: newMessageHandler,
  };

  useSocketEvents(socket,eventHandler);

  useErrors(errors);

  const allMessages = [...oldMessages, ...messages];

  //console.log(oldMessagesChunk.data);

  return chatDetails.isLoading ? ( <Skeleton/> ) : (
    <>
      <Stack 
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto"
        }}
      > 

      {
        allMessages.map((i)=>(
          <MessageComponent key={i._id} message={i} user={user}/>
        ))
      }



      </Stack>

      <form 
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack 
          direction={"row"} 
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >

          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              // rotate: "30deg"
            }}
            onClick={handleFileOpen}
          >
            <AttachFileIcon/>
          </IconButton>

          <InputBox 
            placeholder="Type message here..." 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <IconButton type="submit" sx={{
            // rotate: "-30deg",
            bgcolor: orange, 
            color: "white",
            marginLeft: "1rem",
            padding: "0.5rem",
            "&:hover":{
              bgcolor: "error.dark"
            }
          }}>
            <SendIcon/>
          </IconButton>
          
        </Stack>
      </form>

      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId}/>
    </>
    
  )
}

export default AppLayout()(Chat);