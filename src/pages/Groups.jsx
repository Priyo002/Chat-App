import {Backdrop, Box, Button, CircularProgress, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React, { useState, memo, useEffect, lazy, Suspense } from 'react'
import { 
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon, 
  KeyboardBackspace as KeyboardBackspaceIcon, 
  Menu as MenuIcon
} from '@mui/icons-material'
import { bgGradient, matBlack } from '../constants/color.js'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Link } from '../components/styles/StyledComponents.jsx'
import AvatarCard from '../components/shared/AvatarCard.jsx'
import { sampleUsers, samplechats } from '../constants/sampleData.js'
import UserItem from '../components/shared/UserItem.jsx'
import { 
  useAddGroupMembersMutation,
  useChatDetailsQuery, 
  useDeleteChatMutation, 
  useMyGroupsQuery, 
  useRemoveGroupMemberMutation, 
  useRenameGroupMutation 
} from '../redux/api/api.js'
import { useAsyncMutation, useErrors } from '../hooks/hook.jsx'
import { LayoutLoader } from '../components/layout/Loaders.jsx'
import { useDispatch, useSelector } from 'react-redux'
import {setIsAddMember} from '../redux/reducers/misc.js'


const ConfirmDeleteDialog = lazy(()=>import("../components/dialogs/ConfirmDeleteDialog.jsx"));

const AddMemberDialog = lazy(()=>import("../components/dialogs/AddMemberDialog.jsx"));


const Groups = () => {

  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {isAddMember} = useSelector((state)=> state.misc);
  
  const myGroups = useMyGroupsQuery("");


  const groupDetails = useChatDetailsQuery(
    {chatId, populate: true},
    {skip: !chatId}
  );

  //console.log(groupDetails .data);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit,setIsEdit] = useState(false);
  const [confirmDeleteDialog,setConfirmDeleteDialog] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");

  const [members, setMembers] = useState([]);

  const [ updateGroup , isLoadingGroupName ] = useAsyncMutation(useRenameGroupMutation);
  const [ removeMember , isLoadingRemoveMember ] = useAsyncMutation(useRemoveGroupMemberMutation);
  const [ deleteGroup , isLoadingdeleteGroup ] =  useAsyncMutation(useDeleteChatMutation);
  
  const erros = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    }
  ]

  useErrors()

  useEffect(()=>{
    if(groupDetails.data){
      setGroupName(groupDetails.data.chat?.name);
      setGroupNameUpdatedValue(groupDetails.data.name);
      setMembers(groupDetails.data.chat?.members);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMembers([]);
      setIsEdit(false);
    }
  },[groupDetails.data]);

  useEffect(()=>{
    if(chatId){
    setGroupName(`Group Name ${chatId}`);
    setGroupNameUpdatedValue(`Group Name ${chatId}`);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  },[chatId]);

  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  }

  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const updateGroupName = () => {
    setIsEdit(false);
    updateGroup("Updating Group Name...",{chatId, name: groupNameUpdatedValue});
  };

  const removeMemberHandler = (userId) => {
    removeMember("Removing Member...",{chatId, userId});
  }

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  }

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true));
  };

  const deleteHandler = () => {
    deleteGroup("Deleting Group...",chatId);
    closeConfirmDeleteHandler();
    navigate("/groups");
  };



  const ButtonGroup = (
  <Stack
    direction={{
      sm: "row",
      xs: "column-reverse",
    }}
    spacing={"1rem"}
    p={{
      sm:"1rem",
      xs: "0",
      md: "1rem 4rem"
    }}
  >
    <Button 
      size='large' 
      color='error' 
      startIcon={<DeleteIcon/>} 
      onClick={openConfirmDeleteHandler}
    >
      Delete Group
    </Button>

    <Button 
      size='large' 
      variant='contained' 
      startIcon={<AddIcon/>} 
      onClick={openAddMemberHandler}
    >
      Add Member
    </Button>

  </Stack>
  )


  const GroupName = 
  <Stack 
    direction={"row"} 
    alignItems={"center"} 
    justifyContent={"center"} 
    spacing={"1rem"}
    padding={"3rem"}
  >
    {
      isEdit ? (
        <>
          <TextField 
            value={groupNameUpdatedValue} 
            onChange={(e)=> setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName} disabled={isLoadingGroupName}> 
            <DoneIcon/>
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant='h4'>
            {groupName}
          </Typography>
          <IconButton disabled={isLoadingGroupName} onClick={() => setIsEdit(true)}>
            <EditIcon/>
          </IconButton>
        </>
        
      )
    }
  </Stack>
  

  const IconBtns = 
  <>
    <Box>
      <IconButton
        sx={{
          display:{
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem"
          },
        }}
        onClick={handleMobile}
      >
        <MenuIcon/>
      </IconButton>
    </Box>
    

    <Tooltip title="back">
      <IconButton
        sx={{
          position: "absolute",
          top: "2rem",
          left: "2rem",
          bgcolor: matBlack,
          color: "white",
          ":hover":{
            bgcolor: "rgba(0,0,0,0.7)",
          },
        }}
        onClick={navigateBack}
      >
        <KeyboardBackspaceIcon/>
      </IconButton>
    </Tooltip>
  </>

  return myGroups.isLoading ? ( <LayoutLoader/> ) : (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx = {{
          display: {
            xs : "none",
            sm : "block"
          },
        }}
        sm = {4}
      >
        <GroupsList myGroups={myGroups?.data?.groups} chatId={chatId}/>
      </Grid>


      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtns}

        {groupName && 
        <>
          {GroupName}
          <Typography
            margin={"2rem"}
            alignSelf={"flex-start"}
            variant="body1"
          >
            Members
          </Typography>

          <Stack
            maxWidth={"45rem"}
            width={"100%"}
            boxSizing={'border-box'}
            padding ={{
              sm: "1rem",
              xs: "0",
              md: "1rem 4rem"
            }}
            spacing={"2rem"}
            height={"50vh"}
            overflow={"auto"}
          >
            {/* {Members} */}
            { isLoadingRemoveMember ? (<CircularProgress/>) :  ( members.map((i) => (
                <UserItem 
                  key={i._id}
                  user={i} 
                  isAdded 
                  styling={{
                    boxShadow: "0 0 0.5rem  rgba(0,0,0,0.2)",
                    padding: "1rem 2rem",
                    borderRadius: "1rem"
                  }}
                  handler={removeMemberHandler}
                />
              )))
            }
          </Stack>

          {ButtonGroup}
        
        </>
      }
      </Grid>

      {
        isAddMember && 
        <Suspense fallback={<Backdrop open/>}>
          <AddMemberDialog chatId={chatId}/>
        </Suspense>
      }

      {
        confirmDeleteDialog && <Suspense fallback={<Backdrop open/>}>
          <ConfirmDeleteDialog 
            open={confirmDeleteDialog} 
            handleClose={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      }

      <Drawer 
        sx={{
          display:{
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobileMenuOpen} 
        onClose={handleMobileClose}
      >
        <GroupsList w={"50vw"} myGroups={myGroups?.data?.groups} chatId={chatId}/>
      </Drawer>

    </Grid>

  )
}

const GroupsList = ({w="100%", myGroups=[], chatId}) => (
  <Stack 
    width={w}
    sx={{
      backgroundImage: bgGradient,
      height: "100vh",
      overflow: "auto",
    }}
    
  >
    {
      myGroups.length > 0 ? (
        myGroups.map((group) => <GroupListItem group={group} chatId={chatId} key={group._id}/>) 
      ) : (
        <Typography textAlign={"center"} padding="1rem">
          No groups
        </Typography>
      )
    }
  </Stack>
);

const GroupListItem = memo(({group, chatId}) => {
  const {name, avatar,_id} = group;

  return (
  <Link to={`?group=${_id}`} onClick={(e) => {
    if(chatId===_id) e.preventDefault();
  }}>
    <Stack 
      direction={"row"} 
      spacing={"1rem"}
      alignItems={"center"}
    >
      <AvatarCard avatar={avatar}/>
      <Typography>{name}</Typography>
    </Stack>
  </Link>
  )
});

export default Groups