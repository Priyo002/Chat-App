import React,{useCallback, useEffect, useRef,useState} from 'react';
import AppLayout from '../components/layout/AppLayout';
import { IconButton, Skeleton, Stack } from '@mui/material';
import { grayColor, orange } from '../constants/color.js';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponents.jsx';
import FileMenu from '../components/dialogs/FileMenu.jsx';
import MessageComponent from '../components/shared/MessageComponent.jsx'
import { getSocket } from '../socket.jsx';
import { ALERT, NEW_MESSAGE, START_TYPING, STOP_TYPING } from '../constants/events.js';
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api.js';
import { useErrors, useSocketEvents } from '../hooks/hook.jsx';
import { useInfiniteScrollTop } from '6pp';
import { useDispatch } from 'react-redux';
import { setIsFileMenu } from '../redux/reducers/misc.js';
import { removeNewMessagesAlert } from '../redux/reducers/chat.js';
import { TypingLoader } from '../components/layout/Loaders.jsx';


const Chat = ({chatId, user}) => {

  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  const dispatch = useDispatch();

  const [ message, setMessage ] = useState("");
  const [ messages , setMessages ] = useState([]);
  const [ page, setPage ] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);

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

  const messageOnChange = (e) => {
    setMessage(e.target.value);

    if(!IamTyping){
      socket.emit(START_TYPING,{members,chatId});
      setIamTyping(true);
    }

    if(typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {

      socket.emit(STOP_TYPING,{members,chatId});
      setIamTyping(false);

    },1500)

  }

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

  useEffect(()=>{

    dispatch(removeNewMessagesAlert(chatId));

    return () => {
      setMessages([]);
      setMessage("");
      setPage(1);
      setOldMessages([]);
    };
  },[chatId]);

  useEffect(() => {

    if(bottomRef.current) bottomRef.current.scrollIntoView({behavior: "smooth"});

  },[messages]);

  const newMessagesListener = useCallback((data) => {

    console.log(data);
    if(data.chatId !== chatId) return;
    setMessages((prev) => [...prev,data.message]);

  },[chatId]);

  const startTypingListener = useCallback((data) => {

    if(data.chatId !== chatId) return;
    setUserTyping(true);

    //console.log("start typing",data);
  
  },[chatId]);

  const stopTypingListener = useCallback((data) => {

    if(data.chatId !== chatId) return;
    setUserTyping(false);

    //console.log("stop typing",data);
  
  },[chatId]);

  const alertListener = useCallback((content) => {

    const messageForAlert = {
      content,
      sender: {
        _id: "adfhasfHeloiuahsf",
        name: "Admin",
      },
      chat: chatId,
      createdAt:new Date().toISOString(),
    }

    setMessages((prev) => [...prev,messageForAlert]);

  },[chatId]);


  const errors = [

    {isError: chatDetails.isError, error: chatDetails.error},
    {isError: oldMessagesChunk.isError, error: oldMessagesChunk.error}

  ];

  const eventHandler = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
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

      {userTyping && <TypingLoader/>}

      <div ref={bottomRef}/>      

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
            onChange={messageOnChange}
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