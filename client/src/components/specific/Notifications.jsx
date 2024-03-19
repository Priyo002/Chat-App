import React, { memo } from 'react'
import {Button,Avatar, Dialog, DialogTitle, InputAdornment, List, ListItem, ListItemText, Stack, TextField, Typography } from '@mui/material'
import { sampleNotifications } from '../../constants/sampleData.js'

const Notifications = () => {

  const friendRequestHandler = ({_id,accept}) => {

  }

  return (
    <Dialog open>
      <Stack p={{xs: "1rem", sm:"2rem"}} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>
        {
          sampleNotifications.length > 0 ?
          (
            sampleNotifications.map( ({sender, _id}) => 
              (<NotificationsItem 
                sender={sender} 
                _id={_id} 
                handler={friendRequestHandler}
                key={_id}
              />))
          ) 
          : 
          (
            <Typography textAlign={"center"}>0 Notifications</Typography>
          )
        }
      </Stack>
    </Dialog>
  )
}

const NotificationsItem = memo(({sender,_id,handler}) => {

  const {name,avatar} = sender;

  return (
    <ListItem>
        <Stack 
            direction={"row"}
            alignItems={"center"}
            spacing={"1rem"}
            width={"100%"}
        >
            <Avatar />
            <Typography
                variant="body1"
                sx={{
                    flexGlow: 1,
                    display: "-webkit-flex",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "100%",
                }}
            >
                {`${name} sent you a friend request.`}
            </Typography>

            <Stack direction={{
              xs: "column",
              sm: "row"
            }}>
              <Button onClick={() => handler({_id,accept: true})}>
                Accept
              </Button>

              <Button color="error" onClick={() => handler({_id,accept: false})}>
                Reject
              </Button>
            </Stack>
        </Stack>
    </ListItem>
  )
})

export default Notifications