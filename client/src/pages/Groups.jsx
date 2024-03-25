import {Backdrop, Box, Button, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material'
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


const ConfirmDeleteDialog = lazy(()=>import("../components/dialogs/ConfirmDeleteDialog.jsx"));

const AddMemberDialog = lazy(()=>import("../components/dialogs/AddMemberDialog.jsx"));

const isAddMember = false;

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  console.log(chatId)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit,setIsEdit] = useState(false);
  const [confirmDeleteDialog,setConfirmDeleteDialog] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");

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

  const removeMemberHandler = (id) => {
    console.log("Remove Member ", id)
  }

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
    console.log("Delete Group");
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  }

  const openAddMemberHandler = () => {
    console.log("Add Member");
  };

  const deleteHandler = () => {};


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

  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  }

  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const updateGroupName = () => {
    setIsEdit(false);
    console.log(groupNameUpdatedValue);
  };

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
          <IconButton onClick={updateGroupName}> 
            <DoneIcon/>
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant='h4'>
            {groupName}
          </Typography>
          <IconButton onClick={() => setIsEdit(true)}>
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

  return (
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
        <GroupsList myGroups={samplechats} chatId={chatId}/>
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
            {
              sampleUsers.map((i) => (
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
              ))
            }
          </Stack>

          {ButtonGroup}
        
        </>
      }
      </Grid>

      {
        isAddMember && 
        <Suspense fallback={<Backdrop open/>}>
          <AddMemberDialog/>
        </Suspense>
      }

      {
        confirmDeleteDialog && 
        <Suspense fallback={<Backdrop open/>}>
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
        <GroupsList w={"50vw"} myGroups={samplechats} chatId={chatId}/>
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